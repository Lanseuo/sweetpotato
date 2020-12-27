package recipes

import "github.com/Lanseuo/sweetpotatoe/internal/database"

type Recipe struct {
	ID    string
	Title string
}

func (recipe Recipe) Save() (string, error) {
	var id string
	err := database.DB.QueryRow(`INSERT INTO recipe (title) VALUES ($1) RETURNING id`, recipe.Title).Scan(&id)
	return id, err
}

func List() ([]Recipe, error) {
	var recipes []Recipe
	err := database.DB.Select(&recipes, `
		SELECT
			id,
			title
		FROM recipe
	`)
	return recipes, err
}
