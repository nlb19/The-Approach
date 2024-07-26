package controllers

import (
	"fmt"
	"net/http"
	"the-approach/backend/initializers"
	"the-approach/backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func InitializeProfile(c *gin.Context) {
	user, _ := c.Get("currentUser")

	var profileInput models.ProfileInformationInput

	if err := c.ShouldBindJSON(&profileInput); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	profileInformation := models.ProfileInformation{
		Email:              user.(models.User).Email,
		ProfileInformation: profileInput,
	}

	client, err := initializers.ConnectDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	users := client.Database("the-approach").Collection("users")

	_, err = users.UpdateOne(
		c,
		bson.D{{"email", profileInformation.Email}},
		bson.D{{"$set", bson.D{{"profileInformation", profileInformation.ProfileInformation}}}},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile information updated successfully"})
}
