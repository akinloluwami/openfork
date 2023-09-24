package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uint `gorm:"primaryKey"`
	Name     string
	Username string
	Email    string `gorm:"unique"`
	Password string
	Projects []Project
}
