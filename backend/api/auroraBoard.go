package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"the-approach/backend/models"
	"the-approach/backend/utils"
)

func AuroraLogin(loginInfo models.BoardLogin) (user models.AuroraUser, err error) {
	fmt.Printf("Attempting login for user: %s to board: %s\n", loginInfo.User, loginInfo.Board)

	requestBody := fmt.Sprintf(`{"username": "%s", "password": "%s"}`, loginInfo.User, loginInfo.Password)
	url := fmt.Sprintf("https://api.%s.com/v1/logins", loginInfo.Board)

	res, err := http.Post(url, "application/json", bytes.NewBuffer([]byte(requestBody)))
	if err != nil {
		return user, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer res.Body.Close()

	fmt.Printf("Response Status: %s\n", res.Status)

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return user, fmt.Errorf("failed to read response body: %w", err)
	}

	var apiResponse models.ApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return user, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	token, err := utils.Encrypt(apiResponse.Token)
	if err != nil {
		return user, fmt.Errorf("encryption failed: %w", err)
	}

	fmt.Printf("Encrypted token length: %d\n", len(token))
	decrypted, err := utils.Decrypt(token)
	if err != nil {
		return user, fmt.Errorf("decryption verification failed: %w", err)
	}

	if decrypted != apiResponse.Token {
		return user, fmt.Errorf("encryption/decryption verification mismatch")
	}

	user = models.AuroraUser{
		Username: apiResponse.Username,
		UserID:   apiResponse.UserID,
		Token:    token,
	}

	return user, nil
}

func AuroraAscentsSync(board string, user models.AuroraUser) (err error) {
	fmt.Printf("Attempting sync for board: %s\n", board)

	url := fmt.Sprintf("https://api.%s.com/v1/sync", board)

	decryptedToken, err := utils.Decrypt(user.Token)
	if err != nil {
		return fmt.Errorf("decryption failed: %w", err)
	}

	var auroraInput models.AscentsSync

	auroraInput.Client.EnforcesProductPasswords = 1
	auroraInput.Client.EnforcesLayoutPasswords = 1
	auroraInput.Client.ManagesPowerResponsibly = 1
	auroraInput.Client.Ufd = 1

	auroraInput.Get.Query.Syncs.SharedSyncs = []interface{}{}
	auroraInput.Get.Query.Syncs.UserSyncs = []interface{}{}

	auroraInput.Get.Query.Tables = []string{"ascents"}
	auroraInput.Get.Query.UserId = user.UserID
	auroraInput.Get.Query.IncludeMultiframeClimbs = 1
	auroraInput.Get.Query.IncludeAllBetaLinks = 1
	auroraInput.Get.Query.IncludeNullClimbStats = 1

	auroraInput.Put.Walls = []interface{}{}
	auroraInput.Put.WallExpungements = []interface{}{}

	requestBody, err := json.Marshal(auroraInput)
	if err != nil {
		return fmt.Errorf("failed to marshal request body: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	if err != nil {
		return fmt.Errorf("failed to create HTTP request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", decryptedToken)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("HTTP request failed: %w", err)
	}

	defer res.Body.Close()

	//print raw response
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return fmt.Errorf("failed to read response body: %w", err)
	}

	fmt.Printf("Raw Response: %s\n", string(body))
	return nil
}
