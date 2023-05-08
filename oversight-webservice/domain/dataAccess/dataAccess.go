package dataAccess

import (
	"database/sql"
	"fmt"
	"github.com/nicdillon/oversight/oversight-webservice/domain/dtos"

	_ "github.com/denisenkom/go-mssqldb"
)

func GetAllUsers() ([]dtos.User, error) {
    // Set up the connection string
    connectionString := ""

    // Connect to the database
    db, err := sql.Open("sqlserver", connectionString)
    if err != nil {
        panic(err.Error())
    }
    defer db.Close()

    // Retrieve all rows from the users table
    rows, err := db.Query("SELECT id, username, email FROM users ORDER BY username ASC")
    if err != nil {
        return nil, fmt.Errorf("failed to execute query: %v", err)
    }
    defer rows.Close()

    // Create a slice of User to hold the results
    var users []dtos.User

    // Iterate over the rows and add each one to the slice
    for rows.Next() {
        var dtos dtos.User
        if err := rows.Scan(&dtos.Id, &dtos.Username, &dtos.Email); err != nil {
            return nil, fmt.Errorf("failed to scan row: %v", err)
        }
        users = append(users, dtos)
    }

    return users, nil
}

func GetUser(username string) (dtos.User, error) {
    // Set up the connection string
    connectionString := ""

    // Connect to the database
    db, err := sql.Open("sqlserver", connectionString)
    if err != nil {
        panic(err.Error())
    }
    defer db.Close()

    // Retrieve top result from the users table
    result, err := db.Query("SELECT TOP(1) id, username, email FROM users WHERE username = @username", sql.Named("username", username))
    if err != nil {
        return dtos.User{}, fmt.Errorf("failed to execute query: %v", err)
    }
    defer result.Close()

    var u dtos.User

    // Call Next to advance the cursor to the first row
    if result.Next() {
        // Assign the result to the User struct
        if err := result.Scan(&u.Id, &u.Username, &u.Email); err != nil {
            return dtos.User{}, fmt.Errorf("failed to scan row: %v", err)
        }
    } else {
        return dtos.User{}, fmt.Errorf("no rows found")
    }

    return u, nil
}

