package models

type BoardLogin struct {
	Board    string `json:"board"`
	User     string `json:"user"`
	Password string `json:"password"`
}

type AscentsSync struct {
	Client struct {
		EnforcesProductPasswords int `json:"enforces_product_passwords"`
		EnforcesLayoutPasswords  int `json:"enforces_layout_passwords"`
		ManagesPowerResponsibly  int `json:"manages_power_responsibly"`
		Ufd                      int `json:"ufd"`
	} `json:"client"`
	GET struct {
		Query struct {
			Syncs struct {
				SharedSyncs []interface{} `json:"shared_syncs"`
				UserSyncs   []interface{} `json:"user_syncs"`
			} `json:"syncs"`
			Tables                  []string `json:"tables"`
			UserId                  int      `json:"user_id"`
			IncludeMultiframeClimbs int      `json:"include_multiframe_climbs"`
			IncludeAllBetaLinks     int      `json:"include_all_beta_links"`
			IncludeNullClimbStats   int      `json:"include_null_climb_stats"`
		} `json:"query"`
	} `json:"GET"`
	PUT struct {
		Walls            []interface{} `json:"walls"`
		WallExpungements []interface{} `json:"wall_expungements"`
	} `json:"PUT"`
}

type AuroraSyncResponse struct {
	PUT PutResponse `json:"PUT"`
}

type PutResponse struct {
	Ascents   []AscentData `json:"ascents"`
	Bids      []BidData    `json:"bids"`
	UserSyncs []UserSync   `json:"user_syncs"`
}

type BidData struct {
	UUID      string `json:"uuid"`
	UserID    int    `json:"user_id"`
	ClimbUUID string `json:"climb_uuid"`
	Angle     int    `json:"angle"`
	IsMirror  bool   `json:"is_mirror"`
	BidCount  int    `json:"bid_count"`
	IsListed  bool   `json:"is_listed"`
	Comment   string `json:"comment"`
	ClimbedAt string `json:"climbed_at"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
type AscentData struct {
	UUID        string  `json:"uuid"`
	WallUUID    *string `json:"wall_uuid"`
	ClimbUUID   string  `json:"climb_uuid"`
	Angle       int     `json:"angle"`
	IsMirror    bool    `json:"is_mirror"`
	UserID      int     `json:"user_id"`
	AttemptID   int     `json:"attempt_id"`
	BidCount    int     `json:"bid_count"`
	Quality     int     `json:"quality"`
	Difficulty  int     `json:"difficulty"`
	IsBenchmark bool    `json:"is_benchmark"`
	IsListed    bool    `json:"is_listed"`
	Comment     string  `json:"comment"`
	ClimbedAt   string  `json:"climbed_at"`
	CreatedAt   string  `json:"created_at"`
	UpdatedAt   string  `json:"updated_at"`
}

type UserSync struct {
	UserID             int    `json:"user_id"`
	TableName          string `json:"table_name"`
	LastSynchronizedAt string `json:"last_synchronized_at"`
}
