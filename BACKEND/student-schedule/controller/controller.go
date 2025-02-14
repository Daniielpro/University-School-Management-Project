package controller

import "go.mongodb.org/mongo-driver/bson/primitive"

// Event representa la estructura de un evento en la agenda
type Event struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `json:"title" binding:"required"`
	Description string             `json:"description"`
	Date        string             `json:"date" binding:"required"`
	Time        string             `json:"time" binding:"required"`
}

