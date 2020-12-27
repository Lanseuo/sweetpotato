package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Lanseuo/sweetpotatoe/graph"
	"github.com/Lanseuo/sweetpotatoe/graph/generated"
	"github.com/Lanseuo/sweetpotatoe/internal/auth"
	"github.com/Lanseuo/sweetpotatoe/internal/database"
	"github.com/go-chi/chi"
)

const defaultPort = "8090"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	database.InitDB()
	database.Migrate()

	router := chi.NewRouter()
	router.Use(auth.Authenticate)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
