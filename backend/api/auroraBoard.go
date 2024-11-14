package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"the-approach/backend/models"
)

func AuroraLogin(loginInfo models.BoardLogin) (user models.AuroraUser, err error) {
	fmt.Println(loginInfo)
	res, err := http.Post(
		fmt.Sprintf("https://api.%s.com/v1/logins", loginInfo.Board),
		"application/json", bytes.NewBuffer([]byte(fmt.Sprintf(`{"username": "%s", "password": "%s"}`, loginInfo.User, loginInfo.Password))),
	)
	if err != nil {
		fmt.Println(err)
		return user, err
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return user, err
	}
	var apiResponse models.ApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return user, fmt.Errorf("Failed to unmarshal response: %w", err)
	}

	user = models.AuroraUser{
		Username: apiResponse.Username,
		UserID:   apiResponse.UserID,
		Token:    apiResponse.Token,
	}

	return user, nil
}
