package github

import "github.com/gofiber/fiber/v2"

func GitHubCallbackHandler(c *fiber.Ctx) error {
	return c.SendString("GitHub callback")
}
