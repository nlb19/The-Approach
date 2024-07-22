package controllers

import (
	"net/http"
	"os"
	"the-approach/backend/initializers"
	"the-approach/backend/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var authInput models.RegisterInput

	if err := c.ShouldBindJSON(&authInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userFound models.User
	initializers.DB.Where("email = ?", authInput.Email).First(&userFound)

	if userFound.ID != 0 {
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

	initializers.DB.Create(&user)

	initializers.DB.Where("email = ?", authInput.Email).Find(&userFound)
	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  userFound.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := generateToken.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":        user.ID,
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

	var userFound models.User
	initializers.DB.Where("email = ?", authInput.Email).Find(&userFound)

	if err := bcrypt.CompareHashAndPassword([]byte(userFound.Password), []byte(authInput.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  userFound.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := generateToken.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":        userFound.ID,
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
