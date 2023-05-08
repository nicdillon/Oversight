package user

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
