package main

import (
	"openfork/api/database"
	"openfork/api/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {

	database.InitDatabase()
	app := fiber.New()

	routes.AuthRoues(app)

	app.Listen(":1800")

}
