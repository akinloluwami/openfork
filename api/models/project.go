package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	user_id     uint
	uuid        uuid.UUID
	name        string
	description string
	github_url  string
	logo_url    string
}
