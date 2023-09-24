package routes

import (
	"openfork/api/handlers/auth"
	"openfork/api/handlers/auth/github"

	"github.com/gofiber/fiber/v2"
)

func AuthRoues(app *fiber.App) {

	authGroup := app.Group("/auth")

	authGroup.Post("/login", auth.LoginHandler)
	authGroup.Post("/signup", auth.SignUpHandler)
	authGroup.Get("/github", github.GitHubHandler)
	authGroup.Get("/github/callback", github.GitHubCallbackHandler)
}
