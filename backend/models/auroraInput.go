package models

type BoardLogin struct {
	Board    string `json:"board"`
	User     string `json:"user"`
	Password string `json:"password"`
}
