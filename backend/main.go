package main

import (
	"the-approach/backend/controllers"
	"the-approach/backend/initializers"
	"the-approach/backend/middlewares"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvs()
	initializers.ConnectDatabase()
}
func main() {
	r := gin.Default()

	r.POST("/auth/signup", controllers.CreateUser)
	r.POST("/auth/login", controllers.Login)
	r.GET("/auth/profile", middlewares.CheckAuth, controllers.GetUserProfile)

	r.Run()
}
