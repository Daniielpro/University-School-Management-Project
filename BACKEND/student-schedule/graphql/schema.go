package graphql

import (
	"context"
	"fmt"
	"log"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"student-schedule/database"
)

// Definir el tipo de dato Event
var eventType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Event",
	Fields: graphql.Fields{
		"id":          &graphql.Field{Type: graphql.String},
		"title":       &graphql.Field{Type: graphql.String},
		"description": &graphql.Field{Type: graphql.String},
		"date":        &graphql.Field{Type: graphql.String},
		"time":        &graphql.Field{Type: graphql.String},
	},
})

// Definir el esquema de GraphQL
func NewSchema(db *database.Database) (graphql.Schema, error) {
	return graphql.NewSchema(graphql.SchemaConfig{
		Query:    queryRoot(db),
		Mutation: mutationRoot(db),
	})
}

// Definir las consultas disponibles en GraphQL
func queryRoot(db *database.Database) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"events": &graphql.Field{
				Type: graphql.NewList(eventType),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					var events []map[string]interface{}
					cursor, err := db.Collection.Find(context.TODO(), bson.M{})
					if err != nil {
						return nil, err
					}
					defer cursor.Close(context.TODO())

					for cursor.Next(context.TODO()) {
						var event bson.M
						err := cursor.Decode(&event)
						if err != nil {
							log.Println("❌ Error decodificando evento:", err)
							continue
						}

						// Convertir _id de ObjectID a string
						if id, ok := event["_id"].(primitive.ObjectID); ok {
							event["id"] = id.Hex()
						}

						events = append(events, event)
					}
					log.Println("📢 Eventos obtenidos de MongoDB:", events)
					return events, nil
				},
			},
		},
	})
}

// Definir las mutaciones disponibles en GraphQL
func mutationRoot(db *database.Database) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"createEvent": &graphql.Field{
				Type: eventType,
				Args: graphql.FieldConfigArgument{
					"title":       &graphql.ArgumentConfig{Type: graphql.String},
					"description": &graphql.ArgumentConfig{Type: graphql.String},
					"date":        &graphql.ArgumentConfig{Type: graphql.String},
					"time":        &graphql.ArgumentConfig{Type: graphql.String},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					event := bson.M{
						"_id":         primitive.NewObjectID(),
						"title":       p.Args["title"].(string),
						"description": p.Args["description"].(string),
						"date":        p.Args["date"].(string),
						"time":        p.Args["time"].(string),
					}
					_, err := db.Collection.InsertOne(context.TODO(), event)
					if err != nil {
						return nil, err
					}

					// Convertir `_id` a `id`
					event["id"] = event["_id"].(primitive.ObjectID).Hex()
					delete(event, "_id")

					log.Println("✅ Evento creado:", event)
					return event, nil
				},
			},
			"updateEvent": &graphql.Field{
				Type: eventType,
				Args: graphql.FieldConfigArgument{
					"id":          &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
					"title":       &graphql.ArgumentConfig{Type: graphql.String},
					"description": &graphql.ArgumentConfig{Type: graphql.String},
					"date":        &graphql.ArgumentConfig{Type: graphql.String},
					"time":        &graphql.ArgumentConfig{Type: graphql.String},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					idString, ok := p.Args["id"].(string)
					if !ok || idString == "" {
						log.Println("🚨 Error: ID recibido es inválido o nulo")
						return nil, fmt.Errorf("ID inválido o nulo")
					}

					log.Println("📢 Intentando actualizar evento con ID:", idString)

					id, err := primitive.ObjectIDFromHex(idString)
					if err != nil {
						log.Println("❌ Error convirtiendo ID:", err)
						return nil, err
					}

					updateFields := bson.M{}
					if title, ok := p.Args["title"].(string); ok {
						updateFields["title"] = title
					}
					if description, ok := p.Args["description"].(string); ok {
						updateFields["description"] = description
					}
					if date, ok := p.Args["date"].(string); ok {
						updateFields["date"] = date
					}
					if time, ok := p.Args["time"].(string); ok {
						updateFields["time"] = time
					}

					result, err := db.Collection.UpdateOne(context.TODO(), bson.M{"_id": id}, bson.M{"$set": updateFields})
					if err != nil {
						log.Println("❌ Error al actualizar en MongoDB:", err)
						return nil, err
					}

					if result.ModifiedCount == 0 {
						log.Println("⚠️ No se encontró el evento para actualizar")
						return nil, fmt.Errorf("evento no encontrado")
					}

					log.Println("✅ Evento actualizado correctamente")
					updateFields["id"] = idString
					return updateFields, nil
				},
			},
			"deleteEvent": &graphql.Field{
				Type: graphql.Boolean,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					idString, ok := p.Args["id"].(string)
					if !ok || idString == "" {
						log.Println("🚨 Error: ID recibido es inválido o nulo")
						return false, fmt.Errorf("ID inválido o nulo")
					}

					log.Println("📢 Intentando eliminar evento con ID:", idString)

					id, err := primitive.ObjectIDFromHex(idString)
					if err != nil {
						log.Println("❌ Error convirtiendo ID:", err)
						return false, err
					}

					result, err := db.Collection.DeleteOne(context.TODO(), bson.M{"_id": id})
					if err != nil {
						log.Println("❌ Error al eliminar en MongoDB:", err)
						return false, err
					}

					if result.DeletedCount == 0 {
						log.Println("⚠️ No se encontró el evento para eliminar")
						return false, fmt.Errorf("evento no encontrado")
					}

					log.Println("✅ Evento eliminado correctamente")
					return true, nil
				},
			},
		},
	})
}

