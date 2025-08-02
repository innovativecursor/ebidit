package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"ebidit-business-landing/db"
	"ebidit-business-landing/handler"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	db.ConnectMongo(os.Getenv("MONGO_URI"))

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true, // ✅ This allows requests from any origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.POST("/api/business", handler.SaveBusiness)
	router.GET("/api/business", handler.GetAllBusinesses)
	router.DELETE("/api/business/:id", handler.DeleteBusiness)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	router.Run(":" + port)
}
