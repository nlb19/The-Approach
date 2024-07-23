package controllers

import (
	"fmt"
	"net/http"
	"the-approach/backend/initializers"
	"the-approach/backend/models"

	"github.com/gin-gonic/gin"
)

func InitializeProfile(c *gin.Context) {
	user, _ := c.Get("currentUser")

	var profileInput models.ProfileInformationInput

	if err := c.ShouldBindJSON(&profileInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	profileInformation := models.ProfileInformation{
		ID:                 user.(models.User).ID,
		ProfileInformation: profileInput,
	}

	fmt.Println(profileInformation)
	var userFound models.ProfileInformation
	initializers.DB.Model(&profileInformation).Where("id = ?", user.(models.User).ID).Find(&userFound)

	if userFound.ID == 0 {
		initializers.DB.Create(&profileInformation)
	} else {
		initializers.DB.Model(&profileInformation).Where("id = ?", user.(models.User).ID).Update("profile_information", profileInformation.ProfileInformation)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile information updated successfully"})
}
