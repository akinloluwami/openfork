package routes

import (
	"openfork/api/handlers/auth"

	"github.com/gofiber/fiber/v2"
)

func AuthRoues(app *fiber.App) {

	authGroup := app.Group("/auth")

	authGroup.Post("/login", auth.LoginHandler)
	authGroup.Post("/signup", auth.SignUpHandler)
}
