package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Freelancer struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	FreelancerName     string             `json:"freelancer_name" binding:"required"`
	ProfessionalTitle  string             `json:"professional_title" binding:"required"`
	Industry           string             `json:"industry" binding:"required"`
	Address            Address            `json:"address" binding:"required"`
	Skills             []string           `json:"skills"`
	ExperienceYears    int                `json:"experience_years"`
	HourlyRate         float64            `json:"hourly_rate"`
	ServiceDescription string             `json:"service_description"`
	PortfolioURL       string             `json:"portfolio_url"`
	AvailabilityStatus string             `json:"availability_status"`
	ServiceCategories  []string           `json:"service_categories"`
	CreatedAt          time.Time          `json:"created_at"`
}
