package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httputil"
	"the-approach/backend/models"
	"the-approach/backend/utils"
	"time"
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

	var apiResponse models.LoginApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return user, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	token, err := utils.Encrypt(apiResponse.Token)
	if err != nil {
		return user, fmt.Errorf("encryption failed: %w", err)
	}

	user = models.AuroraUser{
		Username: apiResponse.Username,
		UserID:   apiResponse.UserID,
		Token:    token,
	}

	return user, nil
}

func AuroraAscentsSync(board string, user models.AuroraUser) error {
	fmt.Printf("Attempting sync for board: %s\n", board)

	url := fmt.Sprintf("https://api.%s.com/v1/sync", board)
	fmt.Printf("Request URL: %s\n", url)

	decryptedToken, err := utils.Decrypt(user.Token)
	if err != nil {
		return fmt.Errorf("decryption failed: %w", err)
	}

	var auroraInput models.AscentsSync

	auroraInput.Client.EnforcesProductPasswords = 1
	auroraInput.Client.EnforcesLayoutPasswords = 1
	auroraInput.Client.ManagesPowerResponsibly = 1
	auroraInput.Client.Ufd = 1

	auroraInput.GET.Query.Syncs.SharedSyncs = []interface{}{}
	auroraInput.GET.Query.Syncs.UserSyncs = []interface{}{}

	auroraInput.GET.Query.Tables = []string{"ascents"}
	auroraInput.GET.Query.UserId = user.UserID
	auroraInput.GET.Query.IncludeMultiframeClimbs = 1
	auroraInput.GET.Query.IncludeAllBetaLinks = 1
	auroraInput.GET.Query.IncludeNullClimbStats = 1

	auroraInput.PUT.Walls = []interface{}{}
	auroraInput.PUT.WallExpungements = []interface{}{}

	requestBody, err := json.Marshal(auroraInput)
	if err != nil {
		return fmt.Errorf("failed to marshal request body: %w", err)
	}

	fmt.Printf("Request Body: %s\n", string(requestBody))

	client := &http.Client{
		Timeout: 30 * time.Second,
		Transport: &http.Transport{
			MaxIdleConns:       10,
			IdleConnTimeout:    90 * time.Second,
			DisableCompression: true,
			DisableKeepAlives:  false,
			MaxConnsPerHost:    10,
			ForceAttemptHTTP2:  true,
		},
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(requestBody))
	if err != nil {
		return fmt.Errorf("failed to create HTTP request: %w", err)
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+decryptedToken)

	dump, err := httputil.DumpRequestOut(req, true)
	if err != nil {
		return fmt.Errorf("failed to dump request: %w", err)
	}

	fmt.Printf("Raw HTTP Request:\n%s\n", string(dump))
	res, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("HTTP request failed: %w", err)
	}
	defer func() {
		_, _ = io.Copy(io.Discard, res.Body)
		res.Body.Close()
	}()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return fmt.Errorf("failed to read response body: %w", err)
	}
	fmt.Printf("Response Size: %d bytes\n", len(body))
	fmt.Printf("Response Status: %s\n", res.Status)
	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status %d: %s (URL: %s)",
			res.StatusCode, string(body), url)
	}

	var syncResponse models.AuroraSyncResponse
	if err := json.Unmarshal(body, &syncResponse); err != nil {
		return fmt.Errorf("failed to unmarshal response: %w\nraw response: %s\nURL: %s",
			err, string(body), url)
	}

	fmt.Printf("sync response: %+v\n", syncResponse)

	return nil

}
