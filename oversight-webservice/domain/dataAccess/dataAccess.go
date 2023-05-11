package dataAccess

import (
	"database/sql"
	"fmt"
	"github.com/nicdillon/oversight/oversight-webservice/domain/users"

	_ "github.com/denisenkom/go-mssqldb"
)

type DataAccess struct {
    db *sql.DB
}

var db *sql.DB

func NewDataAccess(db *sql.DB) *DataAccess {
    return &DataAccess{
        db: db,
    }
}

func (d DataAccess)SetDb(database *sql.DB) {
    d.db = database
}

func (d DataAccess)GetAllUsers() ([]users.User, error) {
    if (d.db == nil) {
        return nil, fmt.Errorf("database connection not set")
    }

    // Retrieve all rows from the users table
    rows, err := d.db.Query("SELECT id, username, email FROM users ORDER BY username ASC")
    if err != nil {
        return nil, fmt.Errorf("failed to execute query: %v", err)
    }
    defer rows.Close()

    // Create a slice of User to hold the results
    var userSlice []users.User

    // Iterate over the rows and add each one to the slice
    for rows.Next() {
        var user users.User
        if err := rows.Scan(&user.Id, &user.Username, &user.Email); err != nil {
            return nil, fmt.Errorf("failed to scan row: %v", err)
        }
        userSlice = append(userSlice, user)
    }

    return userSlice, nil
}

func (d DataAccess)GetUser(username string) (users.User, error) {
    if (d.db == nil) {
        return users.NewUser(0, "", ""), fmt.Errorf("database connection not set")
    }

    // Retrieve top result from the users table
    result, err := d.db.Query("SELECT TOP(1) id, username, email FROM users WHERE username = ?", username)
    if err != nil {
        return users.User{}, fmt.Errorf("failed to execute query: %v", err)
    }
    defer result.Close()

    var u users.User

    // Call Next to advance the cursor to the first row
    if result.Next() {
        // Assign the result to the User struct
        if err := result.Scan(&u.Id, &u.Username, &u.Email); err != nil {
            return users.User{}, fmt.Errorf("failed to scan row: %v", err)
        }
    } else {
        return users.User{}, fmt.Errorf("no rows found")
    }

    return u, nil
}

