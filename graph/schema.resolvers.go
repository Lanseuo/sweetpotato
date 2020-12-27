package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"

	"github.com/Lanseuo/sweetpotatoe/graph/generated"
	"github.com/Lanseuo/sweetpotatoe/graph/model"
	"github.com/Lanseuo/sweetpotatoe/internal/auth"
	"github.com/Lanseuo/sweetpotatoe/internal/recipes"
	"github.com/Lanseuo/sweetpotatoe/internal/users"
	"github.com/Lanseuo/sweetpotatoe/internal/utils"
)

func (r *mutationResolver) CreateRecipe(ctx context.Context, input model.NewRecipe) (*model.Recipe, error) {
	// _, ok := auth.UserID(ctx)
	// if !ok {
	// 	return &model.Recipe{}, errors.New("Access denied")
	// }

	var recipe recipes.Recipe
	recipe.Title = input.Title
	id, err := recipe.Save()
	return &model.Recipe{ID: id, Title: recipe.Title}, err
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	id, err := users.Create(input.Email, input.Password)
	return &model.User{ID: id}, err
}

func (r *mutationResolver) Login(ctx context.Context, input model.Login) (string, error) {
	user, err := users.GetByEmail(input.Email)
	if err != nil {
		return "", err
	}
	isPasswordValid := utils.CheckPasswordHash(input.Password, user.Password)
	if !isPasswordValid {
		return "", errors.New("Invalid credentials")
	}

	token, err := auth.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (r *queryResolver) Recipes(ctx context.Context) ([]*model.Recipe, error) {
	var result []*model.Recipe

	// _, ok := auth.UserID(ctx)
	// if !ok {
	// 	return result, errors.New("Access denied")
	// }

	recipes, err := recipes.List()
	if err != nil {
		return []*model.Recipe{}, err
	}

	for _, recipe := range recipes {
		result = append(result, &model.Recipe{ID: recipe.ID, Title: recipe.Title})
	}
	return result, nil
}

func (r *queryResolver) Recipe(ctx context.Context, id string) (*model.Recipe, error) {
	recipe, err := recipes.Get(id)
	if err != nil {
		return &model.Recipe{}, err
	}
	return &model.Recipe{ID: id, Title: recipe.Title}, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
