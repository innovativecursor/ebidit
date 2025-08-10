package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name        string             `json:"name" binding:"required"`
	Designation string             `json:"designation" binding:"required"`
	Phone       string             `json:"phone" binding:"required"`
	Email       string             `json:"email" binding:"required,email"`
	Password    string             `json:"password" binding:"required"`
	BusinessID  primitive.ObjectID `bson:"businessid" json:"businessid" binding:"required"`
	IsRoot      bool               `json:"isroot" bson:"isroot"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
}
