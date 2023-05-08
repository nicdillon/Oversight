package main

import (
	"log"
	"net/http"
	"os"
	dataAccess "oversight/domain/dataAccess"
	user "oversight/domain/dtos"

	"github.com/gin-gonic/gin"
)

func main () {

	// Set up the logger
	logger := log.New(os.Stdout, "oversight-api ", log.LstdFlags|log.Lshortfile)

	logger.Println("Starting application...")

	r := gin.Default()

	r.GET("/api/user", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"users": retrieveUsers(),
		})
	})

	r.GET("/api/user/:username", func(c *gin.Context) {
		username := c.Param("username")
		c.JSON(http.StatusOK, gin.H{
			"user": retrieveUser(username),
		})
	})

	err := r.Run(":8080")
	if err != nil {
		logger.Fatal(err)
		panic(err)
	}
}

func retrieveUsers() ([]user.User) {
	users, err := dataAccess.GetAllUsers()

	if err != nil {
		panic(err)
	}

	return users
}

func retrieveUser(username string) (user.User) {
	user, err := dataAccess.GetUser(username)

	if err != nil {
		panic(err)
	}

	return user
}