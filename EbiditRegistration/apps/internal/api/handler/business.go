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

type RegisterBusinessRequest struct {
	model.Business
	UserInfo model.User `json:"user_info" binding:"required"`
}

func RegisterBusiness(c *gin.Context) {
	var req RegisterBusinessRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// 1. Insert Business
	business := req.Business
	business.ID = primitive.NewObjectID()
	business.CreatedAt = time.Now()

	businessColl := db.Collection(config.GetEnv("MONGO_DB", "ebidit"), "ebidit_businesses")
	_, err := businessColl.InsertOne(ctx, business)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register business"})
		return
	}

	// 2. Ensure no root user already exists for this business
	userColl := db.Collection(config.GetEnv("MONGO_DB", "ebidit"), "ebidit_userinfo")
	if req.UserInfo.IsRoot {
		count, err := userColl.CountDocuments(ctx, bson.M{
			"business_id": business.ID,
			"isRoot":      true,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking root user"})
			return
		}
		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Root user already exists for this business"})
			return
		}
	}

	// 3. Insert User Info
	user := req.UserInfo
	user.ID = primitive.NewObjectID()
	user.BusinessID = &business.ID
	user.IsRoot = true
	// Hash the password before storing
	hashedPwd, err := utils.HashPassword(req.UserInfo.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt password"})
		return
	}
	user.Password = hashedPwd
	user.CreatedAt = time.Now()

	_, err = userColl.InsertOne(ctx, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"business_id": business.ID.Hex(),
		"user_id":     user.ID.Hex(),
		"message":     "Business and root user registered successfully",
	})
}

func AddBusinessUser(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Force isRoot to always be false
	user.IsRoot = false

	// Validate BusinessID
	if user.BusinessID.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Business ID is required"})
		return
	}

	businessID := user.BusinessID

	// Step 1: Check if business exists
	businessColl := db.Collection(config.GetEnv("MONGO_DB", "ebidit"), "ebidit_businesses")
	businessFilter := bson.M{"_id": businessID}
	businessCount, err := businessColl.CountDocuments(context.Background(), businessFilter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking business"})
		return
	}
	if businessCount == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Business ID does not exist"})
		return
	}

	userColl := db.Collection(config.GetEnv("MONGO_DB", "ebidit"), "ebidit_userinfo")

	// Step 2: Check for duplicate email or phone in same business
	filter := bson.M{
		"businessid": businessID,
		"$or": []bson.M{
			{"email": user.Email},
			{"phone": user.Phone},
		},
	}
	count, err := userColl.CountDocuments(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error checking existing user"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User with same email or phone already exists for this business"})
		return
	}

	// Step 3: Hash the password
	hashedPwd, err := utils.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to encrypt password"})
		return
	}
	user.Password = hashedPwd

	// Step 4: Set metadata
	user.ID = primitive.NewObjectID()
	user.CreatedAt = time.Now()

	// Step 5: Save to MongoDB
	_, err = userColl.InsertOne(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"user_id": user.ID.Hex(),
		"message": "Business user added successfully",
	})
}
