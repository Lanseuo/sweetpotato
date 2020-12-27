package database

import (
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func InitDB() {
	db, err := sqlx.Connect("postgres", "host=localhost port=5432 user=postgres password=root dbname=sweetpotato sslmode=disable")
	if err != nil {
		log.Fatalln("Unable to connect to database", err)
	}

	DB = db
}

func Migrate() {
	driver, err := postgres.WithInstance(DB.DB, &postgres.Config{})
	if err != nil {
		log.Fatalln("Unable to get db driver", err)
	}

	mirations, err := migrate.NewWithDatabaseInstance(
		"file://internal/database/migrations",
		"postgres",
		driver,
	)
	if err != nil {
		log.Fatalln("Unable to get db instance", err)
	}

	err = mirations.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatalln("Unable to run db migrations", err)

	}
}
