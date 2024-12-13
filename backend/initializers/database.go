package initializers

import (
	"context"
	"log"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client *mongo.Client
	once   sync.Once
)

func ConnectDatabase() (*mongo.Client, error) {
	var err error
	once.Do(func() {
		uri := os.Getenv("DB_URL")
		if uri == "" {
			log.Fatal("Set your 'DB_URL' environment variable")
		}
		client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
		if err != nil {
			return
		}

		// Create indexes
		err = createIndexes(client)
	})
	return client, err
}

func createIndexes(client *mongo.Client) error {
	collections := []string{"tensionClimbs", "grasshopperClimbs", "kilterClimbs"}

	for _, collName := range collections {
		collection := client.Database("the-approach").Collection(collName)

		// Check if index already exists before creating
		cursor, err := collection.Indexes().List(context.TODO())
		if err != nil {
			return err
		}

		var indexes []bson.M
		if err = cursor.All(context.TODO(), &indexes); err != nil {
			return err
		}

		// Check if UUID index exists
		indexExists := false
		for _, index := range indexes {
			if keys, ok := index["key"].(bson.M); ok {
				if _, exists := keys["UUID"]; exists {
					indexExists = true
					break
				}
			}
		}

		// Create index only if it doesn't exist
		if !indexExists {
			indexModel := mongo.IndexModel{
				Keys:    bson.D{{"UUID", 1}},
				Options: options.Index().SetUnique(true),
			}

			_, err = collection.Indexes().CreateOne(context.TODO(), indexModel)
			if err != nil {
				return err
			}
			log.Printf("Created index for collection: %s", collName)
		}
	}

	return nil
}
