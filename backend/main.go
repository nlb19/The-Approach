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
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
func main() {
	r := gin.Default()

	r.Use(CORSMiddleware())
	r.POST("/auth/signup", controllers.CreateUser)
	r.POST("/auth/login", controllers.Login)
	r.GET("/profile", middlewares.CheckAuth, controllers.GetUserProfile)
	r.POST("/profileInit", middlewares.CheckAuth, controllers.InitializeProfile)
	r.POST("/aurora/login", middlewares.CheckAuth, controllers.BoardLogin)
	r.GET("/aurora/accounts", middlewares.CheckAuth, controllers.GetAuroraAccounts)
	r.POST("/aurora/logout", middlewares.CheckAuth, controllers.AuroraLogout)
	r.POST("/aurora/sync/ascents", middlewares.CheckAuth, controllers.AscentsSync)

	r.Run()
}
