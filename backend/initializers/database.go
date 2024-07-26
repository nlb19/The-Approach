package initializers

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDatabase() (*mongo.Client, error) {
	uri := os.Getenv("DB_URL")

	if uri == "" {
		log.Fatal("Set your 'DB_URL' environment variable. " +
			"See: " +
			"www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().
		ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	return client, nil

	/*
		coll := client.Database("sample_mflix").Collection("movies")
		title := "Back to the Future"
		var result bson.M
		err = coll.FindOne(context.TODO(), bson.D{{"title", title}}).
			Decode(&result)
		if err == mongo.ErrNoDocuments {
			fmt.Printf("No document was found with the title %s\n", title)
			return
		}
		if err != nil {
			panic(err)
		}
		jsonData, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s\n", jsonData)
	*/
}
