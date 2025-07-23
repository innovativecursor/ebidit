package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Business struct {
	ID                      primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	BusinessName            string             `bson:"business_name" json:"business_name"`
	BusinessType            string             `bson:"business_type" json:"business_type"`
	BusinessRole            string             `bson:"business_role" json:"business_role"`
	BusinessIndustry        string             `bson:"business_industry" json:"business_industry"`
	BusinessAddress         Address            `bson:"business_address" json:"business_address"`
	ContactInfo             ContactInfo        `bson:"contact_info" json:"contact_info"`
	PrimaryBusinessActivity string             `bson:"primary_business_activity" json:"primary_business_activity"`
	CreatedAt               time.Time          `bson:"created_at" json:"created_at"`
}

type Address struct {
	AddressLine1 string `bson:"address_line1" json:"address_line1"`
	AddressLine2 string `bson:"address_line2" json:"address_line2"`
	City         string `bson:"city" json:"city"`
	State        string `bson:"state" json:"state"`
	Country      string `bson:"country" json:"country"`
	PostalCode   string `bson:"postal_code" json:"postal_code"`
}

type ContactInfo struct {
	Name        string `bson:"name" json:"name"`
	Designation string `bson:"designation" json:"designation"`
	Phone       string `bson:"phone" json:"phone"`
	Email       string `bson:"email" json:"email"`
}
