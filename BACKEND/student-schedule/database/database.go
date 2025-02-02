package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Database representa la conexión a MongoDB
type Database struct {
	Client     *mongo.Client
	Collection *mongo.Collection
}

// NewDatabase inicializa la conexión con MongoDB
func NewDatabase(uri, dbName, collectionName string) *Database {
	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("No se pudo conectar a MongoDB")
	}

	fmt.Println("Conectado a MongoDB")

	return &Database{
		Client:     client,
		Collection: client.Database(dbName).Collection(collectionName),
	}
}
