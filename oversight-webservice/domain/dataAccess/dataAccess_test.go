package dataAccess_test

import (
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/nicdillon/oversight/oversight-webservice/domain/dataAccess"
	"github.com/nicdillon/oversight/oversight-webservice/domain/users"
)

var da dataAccess.DataAccess

func TestGetAllUsers(t *testing.T) {
    // Set up a mock database connection
    db, mock, err := sqlmock.New()
    if err != nil {
        t.Fatalf("failed to set up mock database connection: %v", err)
    }
    defer db.Close()

	da := dataAccess.NewDataAccess(db)

    // Set up expected query and results
    expectedQuery := "SELECT id, username, email FROM users ORDER BY username ASC"
    expectedRows := sqlmock.NewRows([]string{"id", "username", "email"}).
        AddRow(1, "user1", "user1@example.com").
        AddRow(2, "user2", "user2@example.com")

    // Set up the mock expectations
    mock.ExpectQuery(expectedQuery).WillReturnRows(expectedRows)

    // Call the method and verify the results
    results, err := da.GetAllUsers()
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }

    expectedUsers := []users.User{
        {Id: 1, Username: "user1", Email: "user1@example.com"},
        {Id: 2, Username: "user2", Email: "user2@example.com"},
    }

    if len(results) != len(expectedUsers) {
        t.Fatalf("unexpected number of users: got %d, expected %d", len(results), len(expectedUsers))
    }

    for i, user := range results {
        if user.Id != expectedUsers[i].Id {
            t.Errorf("unexpected user ID at index %d: got %d, expected %d", i, user.Id, expectedUsers[i].Id)
        }

        if user.Username != expectedUsers[i].Username {
            t.Errorf("unexpected username at index %d: got %s, expected %s", i, user.Username, expectedUsers[i].Username)
        }

        if user.Email != expectedUsers[i].Email {
            t.Errorf("unexpected email at index %d: got %s, expected %s", i, user.Email, expectedUsers[i].Email)
        }
    }

    // Verify that all mock expectations were met
    if err := mock.ExpectationsWereMet(); err != nil {
        t.Errorf("unfulfilled mock expectations: %v", err)
    }
}


// Disabled due to bug in Data Dog's sqlmock library when comparing sql quries with names parameters
// func TestGetUser(t *testing.T) {
//     // Set up a mock database connection
//     db, mock, err := sqlmock.New()
//     if err != nil {
//         t.Fatalf("failed to set up mock database connection: %v", err)
//     }
//     defer db.Close()

// 	da := dataAccess.NewDataAccess(db)

//     // Set up expected query and results
//     expectedQuery := "SELECT TOP(1) id, username, email FROM users WHERE username = ?"
//     expectedRows := sqlmock.NewRows([]string{"id", "username", "email"}).
//         AddRow(1, "user1", "user1@example.com")

//     // Set up the mock expectations
//     mock.ExpectQuery(expectedQuery).WillReturnRows(expectedRows)

//     // Call the method and verify the result
//     result, err := da.GetUser("user1")
//     if err != nil {
//         t.Fatalf("unexpected error: %v", err)
//     }

//     expectedUsers := []users.User{
//         {Id: 1, Username: "user1", Email: "user1@example.com"},
//     }

//     if (result != expectedUsers[0]) {
//         t.Fatalf("unexpected results: got " + result.String() + ", expected " + expectedUsers[0].String())
//     }

//     user := result
// 	if user.Id != expectedUsers[0].Id {
// 		t.Errorf("unexpected user ID at index %d: got %d, expected %d", 0, user.Id, expectedUsers[0].Id)
// 	}

// 	if user.Username != expectedUsers[0].Username {
// 		t.Errorf("unexpected username at index %d: got %s, expected %s", 0, user.Username, expectedUsers[0].Username)
// 	}

// 	if user.Email != expectedUsers[0].Email {
// 		t.Errorf("unexpected email at index %d: got %s, expected %s", 0, user.Email, expectedUsers[0].Email)
// 	}
    
//     // Verify that all mock expectations were met
//     if err := mock.ExpectationsWereMet(); err != nil {
//         t.Errorf("unfulfilled mock expectations: %v", err)
//     }
// }
