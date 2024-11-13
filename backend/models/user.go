package models

type User struct {
	FirstName          string                  `json:"first_name"`
	LastName           string                  `json:"last_name"`
	Email              string                  `json:"email"`
	Password           string                  `json:"password"`
	ProfileInformation ProfileInformationInput `json:"profileInformation"`
	BoardInformation   BoardInformationInput   `json:"boardInformation"`
}
type ProfileInformation struct {
	Email              string                  `json:"email"`
	ProfileInformation ProfileInformationInput `json:"profileInformation"`
}

type ProfileInformationInput struct {
	DOB            string `json:"dob"`
	Location       string `json:"location"`
	Discipline     string `json:"discipline"`
	HardestRoute   string `json:"hardestRoute"`
	HardestBoulder string `json:"hardestBoulder"`
	Height         string `json:"height"`
	Weight         string `json:"weight"`
	MaxHang        string `json:"maxHang"`
	MaxPull        string `json:"maxPull"`
	Experience     string `json:"experience"`
	FavLocation    string `json:"favLocation"`
}

type BoardInformationInput struct {
	TensionBoard     AuroraUser `json:"tensionBoard"`
	GrasshopperBoard AuroraUser `json:"grasshopperBoard"`
	KilterBoard      AuroraUser `json:"kilterBoard"`
}
