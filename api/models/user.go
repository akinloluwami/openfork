package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	username string
	email    string
	projects []Project
}
