package auth

import (
	"openfork/api/database"
	"openfork/api/models"
	"openfork/api/utils"

	"github.com/gofiber/fiber/v2"
)

type FormData struct {
	Name            string `json:"name"`
	Username        string `json:"username"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
}

func SignUpHandler(c *fiber.Ctx) error {

	form_data := new(FormData)

	if err := c.BodyParser(form_data); err != nil {
		return c.SendString("Error parsing body")
	}

	if form_data.Name == "" || form_data.Username == "" || form_data.Email == "" || form_data.Password == "" || form_data.ConfirmPassword == "" {
		return c.SendString("Please fill in all fields")
	}

	if form_data.Password != form_data.ConfirmPassword {
		return c.SendString("Passwords do not match")
	}

	if utils.IsUsernameTaken(form_data.Username) {
		return c.SendString("Username is already taken")
	}

	if utils.IsEmailTaken(form_data.Email) {
		return c.SendString("Email is already taken")
	}

	result := database.DB.Create(&models.User{Name: form_data.Name, Username: form_data.Username, Email: form_data.Email, Password: utils.HashPassword(form_data.Password)})

	if result.Error != nil {
		return c.SendString("Error creating user")
	}

	return c.SendString("Signup endpoint")

}
