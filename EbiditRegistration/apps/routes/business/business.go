package business_routes

import (
	"ebidit-registration/apps/internal/api/handler"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {
	r.POST("/api/business/register", handler.RegisterBusiness)
	r.POST("/api/business/user", handler.AddBusinessUser)
}
