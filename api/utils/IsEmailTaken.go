package utils

import (
	"openfork/api/database"
	"openfork/api/models"
)

func IsEmailTaken(email string) bool {
	user := models.User{}
	result := database.DB.Where("email =?", email).First(&user)
	return result.Error == nil

}
