package models

type ProfileInformation struct {
	ID                 uint                    `json:"id" gorm:"primaryKey"`
	ProfileInformation ProfileInformationInput `json:"profileInformation" gorm:"type:jsonb"`
}

type ProfileInformationInput struct {
	DOB            string `json:"dob"`
	Location       string `json:"location"`
	Discipline     string `json:"discipline"`
	HardestRoute   string `json:"hardestRoute"`
	HardestBoulder string `json:"hardestBoulder"`
	Height         string `json:"height"`
	Weight         string `json:"weight"`
	ApeIndex       string `json:"apeIndex"`
	Experience     string `json:"experience"`
}
