package main

import (
	"openfork/api/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()

	routes.AuthRoues(app)

	app.Listen(":1800")

}
