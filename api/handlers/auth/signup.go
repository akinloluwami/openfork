package auth

import (
	"github.com/gofiber/fiber/v2"
)

func SignUpHandler(c *fiber.Ctx) error {

	return c.SendString("Signup endpoint")

}
