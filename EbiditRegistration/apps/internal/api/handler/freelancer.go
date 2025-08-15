package handler

import (
	"context"
	"ebidit-registration/apps/config"
	"ebidit-registration/apps/db"
	model "ebidit-registration/apps/internal/domain"
	"ebidit-registration/apps/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RegisterFreelancerRequest struct {
	model.Freelancer
	UserInfo model.User `json:"user_info" binding:"required"`
}

func RegisterFreelancer(c *gin.Context) {
	var req RegisterFreelancerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	freelancerColl := db.Collection(config.GetEnv("MONGO_DB", "ebidit"), "ebidit_freelancers")
	userColl := db.Collection(config.GetEnv("MONGO_DB", "ebidit"), "ebidit_userinfo")

	// Step 1: Check for duplicate phone/email for freelancers
	filter := bson.M{
		"$or": []bson.M{
			{"email": req.UserInfo.Email},
			{"phone": req.UserInfo.Phone},
		},
	}
	count, err := userColl.CountDocuments(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking existing user"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Freelancer with same email or phone already exists"})
		return
	}

	// Step 2: Create freelancer record
	freelancer := model.Freelancer{
		ID:                 primitive.NewObjectID(),
		FreelancerName:     req.FreelancerName,
		ProfessionalTitle:  req.ProfessionalTitle,
		Industry:           req.Industry,
		Address:            req.Address,
		Skills:             req.Skills,
		ExperienceYears:    req.ExperienceYears,
		HourlyRate:         req.HourlyRate,
		ServiceDescription: req.ServiceDescription,
		PortfolioURL:       req.PortfolioURL,
		AvailabilityStatus: req.AvailabilityStatus,
		ServiceCategories:  req.ServiceCategories,
		CreatedAt:          time.Now(),
	}

	_, err = freelancerColl.InsertOne(context.Background(), freelancer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register freelancer"})
		return
	}

	// Step 3: Create user info for freelancer (password hashed)
	hashedPwd, err := utils.HashPassword(req.UserInfo.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt password"})
		return
	}

	user := model.User{
		ID:           primitive.NewObjectID(),
		Name:         req.UserInfo.Name,
		Phone:        req.UserInfo.Phone,
		Email:        req.UserInfo.Email,
		Password:     hashedPwd,
		FreelancerID: &freelancer.ID,
		IsRoot:       true, // root user for this freelancer account
		CreatedAt:    time.Now(),
	}

	_, err = userColl.InsertOne(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user account"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"freelancer_id": freelancer.ID.Hex(),
		"user_id":       user.ID.Hex(),
		"message":       "Freelancer registered successfully",
	})
}
