package models

type ProfileInformation struct {
	ID                 uint                    `json:"id" gorm:"primaryKey"`
	ProfileInformation ProfileInformationInput `json:"profileInformation" gorm:"type:jsonb"`
}

type ProfileInformationInput struct {
	DOB        string `json:"dob"`
	Location   string `json:"location"`
	Discipline string `json:"discipline"`
}
