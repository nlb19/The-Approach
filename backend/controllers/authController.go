package controllers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"the-approach/backend/initializers"
	"the-approach/backend/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var authInput models.RegisterInput

	if err := c.ShouldBindJSON(&authInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	client, err := initializers.ConnectDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	users := client.Database("the-approach").Collection("users")

	var userFound models.User

	err = users.FindOne(c, bson.D{{"email", authInput.Email}}).Decode(&userFound)

	if err != nil && err.Error() != "mongo: no documents in result" {

		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if userFound.Email == authInput.Email {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User with that email already exists"})
		return
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(authInput.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Email:     authInput.Email,
		Password:  string(passwordHash),
		FirstName: authInput.FirstName,
		LastName:  authInput.LastName,
	}

	users.InsertOne(c, user)

	users.FindOne(c, bson.D{{"email", authInput.Email}}).Decode(&userFound)

	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": userFound.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := generateToken.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	c.JSON(http.StatusOK, gin.H{
		"firstName": user.FirstName,
		"lastName":  user.LastName,
		"email":     user.Email,
		"token":     token,
	})
}

func Login(c *gin.Context) {
	var authInput models.AuthInput

	if err := c.ShouldBindJSON(&authInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client, err := initializers.ConnectDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	users := client.Database("the-approach").Collection("users")

	var userFound models.User
	users.FindOne(c, bson.D{{"email", authInput.Email}}).Decode(&userFound)

	fmt.Println(userFound)

	if err := bcrypt.CompareHashAndPassword([]byte(userFound.Password), []byte(authInput.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": userFound.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := generateToken.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	c.JSON(http.StatusOK, gin.H{
		"firstName": userFound.FirstName,
		"lastName":  userFound.LastName,
		"email":     userFound.Email,
		"token":     token,
	})
}

func GetUserProfile(c *gin.Context) {
	user, _ := c.Get("currentUser")
	c.JSON(http.StatusOK, gin.H{"user": user})
}
