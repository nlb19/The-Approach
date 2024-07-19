package main

import (
	"the-approach/backend/initializers"
	"the-approach/backend/models"
)

func init() {
	initializers.LoadEnvs()
	initializers.ConnectDatabase()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
}
