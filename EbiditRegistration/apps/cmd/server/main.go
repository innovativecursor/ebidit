package main

import (
	"ebidit-registration/apps/config"
	"ebidit-registration/apps/db"
	routes "ebidit-registration/apps/routes/business"
	"log"
)

func main() {
	config.Load()
	db.Connect(config.GetEnv("MONGO_URI", "mongodb://localhost:27017"))

	r := routes.SetupRouter()
	port := config.GetEnv("PORT", "8081")
	log.Printf("Starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
