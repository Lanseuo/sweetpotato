package auth

import (
	"context"
	"net/http"
	"strings"

	"github.com/Lanseuo/sweetpotatoe/internal/users"
	"github.com/dgrijalva/jwt-go"
)

type contextKey int

const (
	// KeyUserID stores context key for user id
	KeyUserID contextKey = iota
)

func Authenticate(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		header := r.Header.Get("Authorization")
		if header == "" {
			handler.ServeHTTP(w, r)
			return
		}

		if !strings.HasPrefix(header, "Bearer ") {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		userID, err := authenticateUser(r.Context(), header[7:])
		if err != nil {
			http.Error(w, "Invalid authorization token", http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), KeyUserID, userID)
		handler.ServeHTTP(w, r.WithContext(ctx))
	})
}

func authenticateUser(ctx context.Context, tokenString string) (string, error) {
	claims := &jwt.StandardClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil || !token.Valid {
		return "", err
	}

	user, err := users.Get(claims.Subject)
	if err != nil {
		return "", err
	}

	return user.ID, nil
}

func UserID(ctx context.Context) (string, bool) {
	id, _ := ctx.Value(KeyUserID).(string)
	return id, id != ""
}
