package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Business struct {
	ID                      primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	BusinessName            string             `json:"business_name" binding:"required"`
	BusinessType            string             `json:"business_type" binding:"required"`
	BusinessRole            string             `json:"business_role" binding:"required"`
	BusinessIndustry        string             `json:"business_industry" binding:"required"`
	BusinessAddress         Address            `json:"business_address" binding:"required"`
	PrimaryBusinessActivity string             `json:"primary_business_activity" binding:"required"`
	CreatedAt               time.Time          `json:"created_at"`
}

type Address struct {
	AddressLine1 string `json:"address_line1" binding:"required"`
	AddressLine2 string `json:"address_line2"`
	City         string `json:"city" binding:"required"`
	State        string `json:"state" binding:"required"`
	Country      string `json:"country" binding:"required"`
	PostalCode   string `json:"postal_code" binding:"required"`
}
