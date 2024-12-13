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
	var earliestAscentTime time.Time
	var latestAscentTime time.Time
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
			// Reset time trackers for new session
			earliestAscentTime = ascentTime // Set to current ascent time instead of zero
			latestAscentTime = ascentTime   // Set to current ascent time instead of zero

			duration := 0.0 // Will be updated as more ascents are added
			currentSession = &models.Session{
				Date:         ascentTime.Format("2006-01-02"), // Use current ascent time
				StartTime:    ascentTime.Format("15:04:05"),   // Use current ascent time
				Duration:     strconv.Itoa(int(duration)),
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
		} else {
			if ascentTime.Before(earliestAscentTime) {
				earliestAscentTime = ascentTime
				currentSession.Date = earliestAscentTime.Format("2006-01-02")
				currentSession.StartTime = earliestAscentTime.Format("15:04:05")
			}
			if ascentTime.After(latestAscentTime) {
				latestAscentTime = ascentTime
			}
			duration := latestAscentTime.Sub(earliestAscentTime).Minutes()
			currentSession.Duration = strconv.Itoa(int(duration))
		}

		boardProblem := ConvertAscentToSession(c, ascent, board.Board)
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
	c.JSON(http.StatusOK, gin.H{"Ascents synced successfully": string(jsonSessions)})
}

func ConvertAscentToSession(c *gin.Context, ascent models.AscentData, board string) models.BoardProblem {
	return models.BoardProblem{
		BoardName:   board,
		ProblemUUID: ascent.UUID,
		BoulderName: GetClimbName(c, ascent, board),
		Grade:       strconv.Itoa(ascent.Difficulty),
		Attempts:    ascent.BidCount,
		Quality:     ascent.Quality,
		Comment:     ascent.Comment,
		RockType:    []string{"plastic", "wood"},
		WallAngle:   strconv.Itoa(ascent.Angle),
		TimeStamp:   ascent.ClimbedAt,
	}
}

func GetClimbName(c *gin.Context, ascent models.AscentData, board string) (climbName string) {
	client, err := initializers.ConnectDatabase()
	if err != nil {
		return ""
	}
	collectionName := map[string]string{
		"tensionboardapp2": "tensionClimbs",
		"grasshopperboard": "grasshopperClimbs",
		"kilterboard":      "kilterClimbs",
	}[board]

	if collectionName == "" {
		return ""
	}

	boardClimbs := client.Database("the-approach").Collection(collectionName)

	var climb models.BoardClimb
	err = boardClimbs.FindOne(c, bson.D{{"UUID", ascent.ClimbUUID}}).Decode(&climb)
	if err != nil {
		climbName = api.AuroraGetClimbName(board, ascent.ClimbUUID, strconv.Itoa(ascent.Angle))
		if climbName != "" {
			boardClimbs.InsertOne(c, bson.D{{"UUID", ascent.ClimbUUID}, {"Name", climbName}})
		}
	} else {
		climbName = climb.Name
	}

	return climbName
}
