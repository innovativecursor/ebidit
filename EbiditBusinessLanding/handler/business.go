package handler

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
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

func GetAllBusinesses(c *gin.Context) {
	collection := db.GetCollection(os.Getenv("MONGO_DB"), "business_landing")

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}
	defer cursor.Close(context.Background())

	var businesses []model.Business
	if err := cursor.All(context.Background(), &businesses); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading data"})
		return
	}

	c.JSON(http.StatusOK, businesses)
}

func DeleteBusiness(c *gin.Context) {
	idParam := c.Param("id")

	objID, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	collection := db.GetCollection(os.Getenv("MONGO_DB"), "business_landing")
	result, err := collection.DeleteOne(context.Background(), bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete business"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Business not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Business deleted successfully",
		"id":      idParam,
	})
}
