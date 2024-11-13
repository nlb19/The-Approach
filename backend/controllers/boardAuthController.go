package controllers

import (
	"net/http"
	"the-approach/backend/api"
	"the-approach/backend/initializers"
	"the-approach/backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func BoardLogin(c *gin.Context) {
	var auroraInput models.BoardLogin

	if err := c.ShouldBindJSON(&auroraInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client, err := initializers.ConnectDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	auroraUser, err := api.AuroraLogin(auroraInput)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	user, _ := c.Get("currentUser")
	users := client.Database("the-approach").Collection("users")

	switch auroraInput.Board {
	case "tensionboardapp2":
		users.UpdateOne(
			c,
			bson.D{{"email", user.(models.User).Email}},
			bson.D{{"$set", bson.D{{"TensionBoard", auroraUser}}}},
		)
	case "grasshopperboardapp":
		users.UpdateOne(
			c,
			bson.D{{"email", user.(models.User).Email}},
			bson.D{{"$set", bson.D{{"GrassHopperBoard", auroraUser}}}},
		)
	case "kilterboardapp":
		users.UpdateOne(
			c,
			bson.D{{"email", user.(models.User).Email}},
			bson.D{{"$set", bson.D{{"KilterBoard", auroraUser}}}},
		)
	}

}
