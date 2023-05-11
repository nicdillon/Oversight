package users

import (
	"database/sql"
	"fmt"
)

type User struct {
	Id       int
	Username string
	Email    string
}

func NewUser(id int, username string, email string) User {
	return User{
		Id:       id,
		Username: username,
		Email:    email,
	}
}

func (u User) Scan(row *sql.Row) {
	err := row.Scan(&u.Id, &u.Username, &u.Email)

	if err != nil {
		panic(err)
	}
}

func (u User) String() string {
	return fmt.Sprintf("User{id:%d, username:%s, email:%s}", u.Id, u.Username, u.Email)
}
