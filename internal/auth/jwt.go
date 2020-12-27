package auth

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

// secret key being used to sign tokens
var (
	jwtSecret = []byte("secret")
)

// GenerateToken generates a jwt token and assign a username to it's claims and return it
func GenerateToken(userID string) (string, error) {
	claims := jwt.StandardClaims{
		Subject:   userID,
		Issuer:    "auth.sweetpotato.hild.dev",
		Audience:  "sweetpotato.hild.dev",
		ExpiresAt: time.Now().Add(30 * time.Minute).Unix(),
		IssuedAt:  time.Now().Unix(),
	}

	tokenClaims := jwt.NewWithClaims(jwt.GetSigningMethod("HS512"), claims)
	token, err := tokenClaims.SignedString(jwtSecret)
	return token, err
}
