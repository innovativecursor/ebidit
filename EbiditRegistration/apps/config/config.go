package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func Load() {
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ No .env file found")
	}
}

func GetEnv(key, fallback string) string {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	return v
}
