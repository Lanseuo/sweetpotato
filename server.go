package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Lanseuo/sweetpotatoe/graph"
	"github.com/Lanseuo/sweetpotatoe/graph/generated"
	"github.com/Lanseuo/sweetpotatoe/internal/auth"
	"github.com/Lanseuo/sweetpotatoe/internal/database"
	"github.com/Lanseuo/sweetpotatoe/internal/utils"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/vektah/gqlparser/v2/gqlerror"
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

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	}))

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	srv.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {
		err := graphql.DefaultErrorPresenter(ctx, e)

		userErr, ok := e.(utils.UserError)
		if ok {
			err.Message = string(userErr.Type)
		} else {
			log.Println(err)
			err.Message = "InternalServerError"
		}

		return err
	})

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
