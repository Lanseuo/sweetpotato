package users

import (
	"github.com/Lanseuo/sweetpotatoe/internal/database"
	"github.com/Lanseuo/sweetpotatoe/internal/utils"
)

type User struct {
	ID       string
	Email    string
	Password string
}

func Create(email, password string) (string, error) {
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return "", err
	}

	var id string
	err = database.DB.QueryRow(`INSERT INTO public.user (email, password) VALUES ($1, $2) RETURNING id`, email, hashedPassword).Scan(&id)
	return id, err
}

func Get(id string) (User, error) {
	var user User
	err := database.DB.Get(&user, `SELECT id, email, password FROM public.user WHERE id = $1`, id)
	return user, err
}

func GetByEmail(email string) (User, error) {
	var user User
	err := database.DB.Get(&user, `SELECT id, email, password FROM public.user WHERE email = $1`, email)
	return user, err
}
