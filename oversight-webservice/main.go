package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/nicdillon/oversight/oversight-webservice/domain/dataAccess"
	"github.com/nicdillon/oversight/oversight-webservice/domain/db"
	"github.com/nicdillon/oversight/oversight-webservice/domain/users"

	"github.com/gin-gonic/gin"
)

func main () {
	logger := setupLogger()
	logger.Println("Starting application...")

	defer func() {
        if err := recover(); err != nil {
            logger.Println("Recovered from panic:", err)
        }
    }()

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

func setupLogger() *log.Logger {
	year, month, day := time.Now().Date()
    timestamp := fmt.Sprintf("%d-%d-%d", year, month, day)
    pathToFile := "logs/logfile-" + timestamp + ".txt"
	file, err := os.OpenFile(pathToFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
    if err != nil {
        log.Fatal(err)
    }
	logger := log.New(file, "oversight-webservice ", log.Ldate|log.Ltime)

	return logger
}

func retrieveUsers() ([]users.User) {
	db, err := db.CreateDbConnection()

	if err != nil {
		panic(err)
	}
	da := dataAccess.NewDataAccess(db)

	users, err := da.GetAllUsers()

	if err != nil {
		panic(err)
	}

	return users
}

func retrieveUser(username string) (users.User) {
	fmt.Println("Retrieving user " + username + "...")
	db, err := db.CreateDbConnection()

	if err != nil {
		panic(err)
	}
	da := dataAccess.NewDataAccess(db)

	user, err := da.GetUser(username)

	if err != nil {
		panic(err)
	}

	return user
}