package github

import (
	"fmt"
	"openfork/api/envconfig"

	"github.com/gofiber/fiber/v2"
)

func GitHubHandler(c *fiber.Ctx) error {
	AppConfig := envconfig.Load()

	redirectURL := fmt.Sprintf("https://github.com/login/oauth/authorize?client_id=%s&scope=user:email", AppConfig.GitHubClientID)
	return c.Redirect(redirectURL)
}
