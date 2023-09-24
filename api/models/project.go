package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	ID          uint `gorm:"primaryKey"`
	UserID      uint
	UUID        uuid.UUID
	Name        string
	Description string
	GithubURL   string `gorm:"unique"`
	LogoURL     string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
