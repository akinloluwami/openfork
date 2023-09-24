package database

import (
	"fmt"
	"openfork/api/envconfig"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() {
	AppConfig := envconfig.Load()

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		AppConfig.DBHost, AppConfig.DBUser, AppConfig.DBPassword,
		AppConfig.DBName, AppConfig.DBPort, AppConfig.DBSSLMode,
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	} else {
		fmt.Println("Connected to the database")
	}

	DB = db
}
