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
	Get struct {
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
	Put struct {
		Walls            []interface{} `json:"walls"`
		WallExpungements []interface{} `json:"wall_expungements"`
	} `json:"PUT"`
}
