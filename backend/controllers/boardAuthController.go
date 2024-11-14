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
	user, exists := c.Get("currentUser")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	currentUser, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type"})
		return
	}
	users := client.Database("the-approach").Collection("users")

	var updateField string
	switch auroraInput.Board {
	case "tensionboardapp2":
		updateField = "TensionBoard"
	case "grasshopperboardapp":
		updateField = "GrassHopperBoard"
	case "kilterboardapp":
		updateField = "KilterBoard"
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid board type"})
		return
	}

	result, err := users.UpdateOne(
		c,
		bson.D{{"email", currentUser.Email}},
		bson.D{{"$set", bson.D{{updateField, auroraUser}}}},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

}
