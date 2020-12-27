package utils

import "fmt"

type UserErrorType string

const (
	ErrAuthorization UserErrorType = "AuthorizationError"
)

type UserError struct {
	error
	Type UserErrorType
}

func (err UserError) Error() string {
	return string(err.Type)
}

func NewUserError(type_ UserErrorType) UserError {
	return UserError{
		error: fmt.Errorf(string(type_)),
		Type:  type_,
	}
}
