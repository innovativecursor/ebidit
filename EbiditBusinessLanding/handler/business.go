package handler

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"ebidit-business-landing/db"
	"ebidit-business-landing/model"
)

func SaveBusiness(c *gin.Context) {
	var business model.Business

	if err := c.ShouldBindJSON(&business); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	business.ID = primitive.NewObjectID()
	business.CreatedAt = time.Now()

	collection := db.GetCollection(os.Getenv("MONGO_DB"), "business_landing")
	_, err := collection.InsertOne(context.Background(), business)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save business"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Business registered successfully",
		"id":      business.ID.Hex(),
	})
}
