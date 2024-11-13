package models

type ResUser struct {
	ID           int     `json:"id"`
	Username     string  `json:"username"`
	EmailAddress string  `json:"email_address"`
	City         *string `json:"city"`         // nullable
	Country      *string `json:"country"`      // nullable
	AvatarImage  *string `json:"avatar_image"` // nullable
	BannerImage  *string `json:"banner_image"` // nullable
	Height       *int    `json:"height"`       // nullable
	Wingspan     *int    `json:"wingspan"`     // nullable
	Weight       *int    `json:"weight"`       // nullable
	IsPublic     bool    `json:"is_public"`
	IsListed     bool    `json:"is_listed"`
	CreatedAt    string  `json:"created_at"`
	UpdatedAt    string  `json:"updated_at"`
}

type ResLogin struct {
	Token     string `json:"token"`
	UserID    int    `json:"user_id"`
	CreatedAt string `json:"created_at"`
}

type ApiResponse struct {
	Token    string   `json:"token"`
	UserID   int      `json:"user_id"`
	Username string   `json:"username"`
	Login    ResLogin `json:"login"`
	User     ResUser  `json:"user"`
}

type AuroraUser struct {
	UserName string `json:"userName"`
	UserID   int    `json:"userID"`
	Token    string `json:"token"`
}
