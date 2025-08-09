package routes

import (
	"ebidit-registration/apps/internal/api/handler"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.POST("/api/business/register", handler.RegisterBusiness)
	return r
}
