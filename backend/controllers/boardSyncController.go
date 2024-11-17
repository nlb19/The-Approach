package controllers

import (
	"fmt"
	"net/http"
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
	var AuroraAccount = GetAuroraAccount(board.Board, c)

	var auroraInput models.AscentsSync

}

func GetAuroraAccount(board string, c *gin.Context) {
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

	switch board {
	case "tensionboardapp2":
		return userAccounts.BoardInformation.TensionBoard
	case "grasshopperboard":
		return userAccounts.BoardInformation.GrasshopperBoard
	case "kilterboard":
		return userAccounts.BoardInformation.KilterBoard
	}
}
