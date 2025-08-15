package freelancer_routes

import (
	"ebidit-registration/apps/internal/api/handler"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {
	r.POST("/api/freelancer/register", handler.RegisterFreelancer)
}
