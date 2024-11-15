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
		updateField = "boardInformation.tensionBoard"
	case "grasshopperboardapp":
		updateField = "boardInformation.grasshopperBoard"
	case "kilterboardapp":
		updateField = "boardInformation.kilterBoard"
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

	c.JSON(http.StatusOK, gin.H{"message": "Board information updated successfully"})
}

func GetAuroraAccounts(c *gin.Context) {
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

	fmt.Println(userAccounts.BoardInformation)
	var boardUsers struct {
		TensionBoard     string `json:"tensionBoard"`
		GrasshopperBoard string `json:"grasshopperBoard"`
		KilterBoard      string `json:"kilterBoard"`
	}

	boardUsers.TensionBoard = userAccounts.BoardInformation.TensionBoard.Username
	boardUsers.GrasshopperBoard = userAccounts.BoardInformation.GrasshopperBoard.Username
	boardUsers.KilterBoard = userAccounts.BoardInformation.KilterBoard.Username

	c.JSON(http.StatusOK, boardUsers)
}

func AuroraLogout(c *gin.Context) {
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

	var board struct {
		Board string `json:"board"`
	}
	if err := c.ShouldBindJSON(&board); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	switch board.Board {
	case "tensionBoard":
		board.Board = "boardInformation.tensionBoard"
	case "grasshopperBoard":
		board.Board = "boardInformation.grasshopperBoard"
	case "kilterBoard":
		board.Board = "boardInformation.kilterBoard"
	}

	result, err := users.UpdateOne(
		c,
		bson.D{{Key: "email", Value: currentUser.Email}},
		bson.D{{Key: "$unset", Value: bson.D{{Key: board.Board, Value: ""}}}},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var userAccounts models.User

	err = users.FindOne(c, bson.D{{"email", currentUser.Email}}).Decode(&userAccounts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var boardUsers struct {
		TensionBoard     string `json:"tensionBoard"`
		GrasshopperBoard string `json:"grasshopperBoard"`
		KilterBoard      string `json:"kilterBoard"`
	}

	boardUsers.TensionBoard = userAccounts.BoardInformation.TensionBoard.Username
	boardUsers.GrasshopperBoard = userAccounts.BoardInformation.GrasshopperBoard.Username
	boardUsers.KilterBoard = userAccounts.BoardInformation.KilterBoard.Username

	c.JSON(http.StatusOK, boardUsers)
}
