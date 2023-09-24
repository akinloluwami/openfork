package auth

import (
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

	return c.SendString("Signup endpoint")

}
