package db

import (
	"database/sql"
	"errors"
	"os"
)

var sqlConnectionString string

func CreateDbConnection() (*sql.DB, error) {
	// Retrieve connection string from config file
	sqlConnectionString := os.Getenv("OVERSIGHT_SQL_CONNECTION_STRING")
	if sqlConnectionString == "" {
		return nil, errors.New("OVERSIGHT_SQL_CONNECTION_STRING environment variable not set")
	}

	// Create a connection to the database
	db, err := sql.Open("mssql", sqlConnectionString)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func CloseDbConnection(db *sql.DB) {
	err := db.Close()
	if err != nil {
		panic(err)
	}
}
