package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"the-approach/backend/api"
	"the-approach/backend/initializers"
	"the-approach/backend/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func AscentsSync(c *gin.Context) {

	var board struct {
		Board string `json:"board"`
	}

	if err := c.ShouldBindJSON(&board); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, exists := c.Get("currentUser")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	currentUser, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type"})
		return
	}

	client, err := initializers.ConnectDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	users := client.Database("the-approach").Collection("users")

	var userAccounts models.User

	err = users.FindOne(c, bson.D{{"email", currentUser.Email}}).Decode(&userAccounts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var auroraAccount models.AuroraUser
	switch board.Board {
	case "tensionboardapp2":
		auroraAccount = userAccounts.BoardInformation.TensionBoard
	case "grasshopperboard":
		auroraAccount = userAccounts.BoardInformation.GrasshopperBoard
	case "kilterboard":
		auroraAccount = userAccounts.BoardInformation.KilterBoard
	}
	var syncResponse models.AuroraSyncResponse
	syncResponse, err = api.AuroraAscentsSync(board.Board, auroraAccount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var currentSession *models.Session
	var lastAscentTime time.Time
	var sessions []models.Session
	for _, ascent := range syncResponse.PUT.Ascents {
		ascentTime, err := time.Parse("2006-01-02 15:04:05", ascent.ClimbedAt)
		if err != nil {
			continue
		}

		needNewSession := currentSession == nil ||
			ascentTime.Format("2006-01-02") != lastAscentTime.Format("2006-01-02")

		if needNewSession {
			if currentSession != nil {
				sessions = append(sessions, *currentSession)
			}

			currentSession = &models.Session{
				Date:         ascentTime.Format("2006-01-02"),
				Time:         ascentTime.Format("15:04:05"),
				Duration:     "",
				Setting:      "indoor",
				Location:     "",
				Focus:        "",
				Intensity:    "",
				Enjoyment:    "",
				Satisfaction: "",
				Workouts: models.Workouts{
					BoardProblems: []models.BoardProblem{},
				},
			}
		}

		boardProblem := ConvertAscentToSession(ascent, board.Board)
		currentSession.Workouts.BoardProblems = append(currentSession.Workouts.BoardProblems, boardProblem)
		lastAscentTime = ascentTime
	}
	if currentSession != nil {
		sessions = append(sessions, *currentSession)
	}
	jsonSessions, err := json.MarshalIndent(sessions, "", "  ")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal sessions"})
		return
	}
	fmt.Println(string(jsonSessions))
	c.JSON(http.StatusOK, gin.H{"message": "Ascents synced successfully"})
}

func ConvertAscentToSession(ascent models.AscentData, board string) models.BoardProblem {
	return models.BoardProblem{
		BoardName:   board,
		ProblemUUID: ascent.UUID,
		BoulderName: ascent.ClimbUUID,
		Grade:       strconv.Itoa(ascent.Difficulty),
		Attempts:    ascent.BidCount,
		Quality:     ascent.Quality,
		Comment:     ascent.Comment,
		RockType:    []string{"plastic", "wood"},
		WallAngle:   strconv.Itoa(ascent.Angle),
		TimeStamp:   ascent.ClimbedAt,
	}
}
