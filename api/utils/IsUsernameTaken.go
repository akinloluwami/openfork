package utils

import (
	"openfork/api/database"
	"openfork/api/models"
)

func IsUsernameTaken(username string) bool {
	user := models.User{}
	result := database.DB.Where("username = ?", username).First(&user)
	return result.Error == nil
}
