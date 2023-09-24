package auth

import (
	"github.com/gofiber/fiber/v2"
)

func LoginHandler(c *fiber.Ctx) error {

	return c.SendString("Login endpoint")
}
