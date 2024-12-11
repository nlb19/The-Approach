package controllers

import (
	"fmt"
	"net/http"
	"the-approach/backend/api"
	"the-approach/backend/initializers"
	"the-approach/backend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func AscentsSync(c *gin.Context) {

	var board struct {
		Board string `json:"board"`
	}

	if err := c.ShouldBindJSON(&board); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	client, err := initializers.ConnectDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	users := client.Database("the-approach").Collection("users")

	var userAccounts models.User

	err = users.FindOne(c, bson.D{{"email", currentUser.Email}}).Decode(&userAccounts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var auroraAccount models.AuroraUser
	switch board.Board {
	case "tensionboardapp2":
		auroraAccount = userAccounts.BoardInformation.TensionBoard
	case "grasshopperboard":
		auroraAccount = userAccounts.BoardInformation.GrasshopperBoard
	case "kilterboard":
		auroraAccount = userAccounts.BoardInformation.KilterBoard
	}

	err = api.AuroraAscentsSync(board.Board, auroraAccount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Ascents synced successfully"})
}
