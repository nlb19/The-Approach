package models

type HangboardWorkout struct {
	Weight          int    `json:"weight"` // in lbs (incl body weight)
	Reps            int    `json:"reps"`
	RepDuration     string `json:"repDuration"` // in seconds
	Sets            int    `json:"sets"`
	RestBetweenSets string `json:"restBetweenSets"` // in seconds
	RestBetweenReps string `json:"restBetweenReps"` // in seconds
	EdgeSize        string `json:"edgeSize"`        // in mm
	GripType        string `json:"gripType"`        // can be {"halfCrimp", "openHand", "fullCrimp", "pinch", "sloper", "jug", "other"}
	Comment         string `json:"comment"`         // any additional notes
	TimeStamp       string `json:"timestamp"`
}

type CampusBoardWorkout struct {
	Reps            int    `json:"reps"`
	Sequence        string `json:"sequence"` // can be {"1-3-5", "1-4-7", "1-5-9", "1-6-11", "1-7-13", "1-8-15", "other"}
	Sets            int    `json:"sets"`
	RestBetweenSets string `json:"restBetweenSets"` // in seconds
	RestBetweenReps string `json:"restBetweenReps"` // in seconds
	EdgeSize        string `json:"edgeSize"`        // in mm (99+ = jug)
	Comment         string `json:"comment"`         // any additional notes
	TimeStamp       string `json:"timestamp"`
}

type PullUpWorkout struct {
	Weight          int    `json:"weight"` // in lbs (incl body weight)
	Reps            int    `json:"reps"`
	Sets            int    `json:"sets"`
	RestBetweenSets string `json:"restBetweenSets"` // in seconds
	Comment         string `json:"comment"`         // any additional notes
	TimeStamp       string `json:"timestamp"`
}

type CoreWorkout struct {
	WorkoutName     string `json:"workoutName"` // can be any workout
	Reps            int    `json:"reps"`
	RepDuration     int    `json:"repDuration"` // in seconds
	Sets            int    `json:"sets"`
	RestBetweenSets string `json:"restBetweenSets"` // in seconds
	Comment         string `json:"comment"`         // any additional notes
	TimeStamp       string `json:"timestamp"`
}

type GenericWorkouet struct {
	WorkoutName     string `json:"workoutName"` // can be any workout
	Reps            int    `json:"reps"`
	RepDuration     int    `json:"repDuration"` // in seconds
	Sets            int    `json:"sets"`
	RestBetweenSets string `json:"restBetweenSets"` // in seconds
	Comment         string `json:"comment"`         // any additional notes
	TimeStamp       string `json:"timestamp"`
}

type Stretch struct {
	StretchName string `json:"stretchName"` // can be any stretch
	Reps        int    `json:"reps"`
	RepDuration int    `json:"repDuration"` // in seconds
	Sets        int    `json:"sets"`
	Comment     string `json:"comment"` // any additional notes
	TimeStamp   string `json:"timestamp"`
}

type WarmUp struct {
	WarmUpName  string `json:"warmUpName"` // can be any warm up
	Reps        int    `json:"reps"`
	RepDuration int    `json:"repDuration"` // in seconds
	Sets        int    `json:"sets"`
	Comment     string `json:"comment"` // any additional notes
	TimeStamp   string `json:"timestamp"`
}

type BoulderProblem struct {
	BoulderName string `json:"BoulderName"`
	Grade       string `json:"grade"` // can be any grade
	Attempts    int    `json:"attempts"`
	IsRepeat    bool   `json:"isRepeat"`
	Quality     int    `json:"quality"` // 1-10 (aurora is 1, 2, 3 => 1, 5, 10)
	Style       string `json:"style"`
	Comment     string `json:"comment"`   // any additional notes
	RockType    string `json:"rockType"`  // combination {"sandstone", "limestone", "granite", "quartzite", "basalt", "gneiss", "schist", "wood", "plastic", "other"}
	WallAngle   string `json:"wallAngle"` // in degrees
	TimeStamp   string `json:"timestamp"`
}

type Route struct {
	RouteName string `json:"RouteName"`
	Grade     string `json:"grade"` // can be any grade
	Attempts  int    `json:"attempts"`
	Quality   int    `json:"quality"`
	Style     string `json:"style"`
	Comment   string `json:"comment"`   // any additional notes
	RockType  string `json:"rockType"`  // combination {"sandstone", "limestone", "granite", "quartzite", "basalt", "gneiss", "schist", "wood", "plastic", "other"}
	WallAngle string `json:"wallAngle"` // in degrees
	TimeStamp string `json:"timestamp"`
}

type BoardProblem struct {
	BoardName   string `json:"BoardName"`
	ProblemUUID string `json:"BoulderUUID"`
	BoulderName string `json:"BoulderName"`
	Grade       string `json:"grade"` // can be any grade
	Attempts    int    `json:"attempts"`
	Quality     int    `json:"quality"` // 1-10 (aurora is 1, 2, 3 => 1, 5, 10)
	Style       string `json:"style"`
	Comment     string `json:"comment"`   // any additional notes
	RockType    string `json:"rockType"`  // combination {"sandstone", "limestone", "granite", "quartzite", "basalt", "gneiss", "schist", "wood", "plastic", "other"}
	WallAngle   string `json:"wallAngle"` // in degrees
	TimeStamp   string `json:"timestamp"`
}

type Workouts struct {
	HangboardWorkouts   []HangboardWorkout   `json:"hangboardWorkouts"`
	CampusBoardWorkouts []CampusBoardWorkout `json:"campusBoardWorkouts"`
	PullUpWorkouts      []PullUpWorkout      `json:"pullUpWorkouts"`
	CoreWorkouts        []CoreWorkout        `json:"coreWorkouts"`
	GenericWorkouts     []GenericWorkouet    `json:"genericWorkouts"`
	Stretches           []Stretch            `json:"stretches"`
	WarmUps             []WarmUp             `json:"warmUps"`
	BoulderProblems     []BoulderProblem     `json:"boulderProblems"`
	Routes              []Route              `json:"routes"`
	BoardProblems       []BoardProblem       `json:"boardProblems"`
}

type Session struct {
	Date         string   `json:"date"`
	Time         string   `json:"time"`
	Duration     string   `json:"duration"`     // in minutes
	Setting      string   `json:"setting"`      // {"indoor", "outdoor", "home"}
	Location     string   `json:"location"`     // Crag name, gym name, or "home"
	Focus        string   `json:"focus"`        // {"endurance", "strength", "power", "technique", "rehab", "other"}
	Intensity    int      `json:"intensity"`    // 1-10
	Enjoyment    int      `json:"enjoyment"`    // 1-10
	Satisfaction int      `json:"satisfaction"` // 1-10
	Workouts     Workouts `json:"workouts"`
}
