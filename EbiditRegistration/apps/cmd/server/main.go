package main

import (
	"ebidit-registration/apps/config"
	"ebidit-registration/apps/db"
	business_routes "ebidit-registration/apps/routes/business"
	freelancer_routes "ebidit-registration/apps/routes/freelancer"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	config.Load()
	db.Connect(config.GetEnv("MONGO_URI", "mongodb://localhost:27017"))

	r := gin.Default()
	business_routes.SetupRouter(r)
	freelancer_routes.SetupRouter(r)

	port := config.GetEnv("PORT", "8081")
	log.Printf("Starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
