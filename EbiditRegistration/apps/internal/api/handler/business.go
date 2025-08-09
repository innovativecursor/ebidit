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
	user.BusinessID = business.ID
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
