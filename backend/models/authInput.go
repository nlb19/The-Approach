package models

type AuthInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type RegisterInput struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}
