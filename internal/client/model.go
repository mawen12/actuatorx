package client

import (
	"net/http"
	"time"
)

type Auther interface {
	Auth(req *http.Request)
}

type BasicAuth struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func (b *BasicAuth) Auth(req *http.Request) {
	if req != nil {
		req.SetBasicAuth(b.Username, b.Password)
	}
}

type BearerToken struct {
	Token string `form:"token"`
}

func (b *BearerToken) Auth(req *http.Request) {
	if req != nil {
		req.Header.Set("Authorization", "Bearer "+b.Token)
	}
}

type (
	ActuatorResp struct {
		Links map[string]ActuatorLink `json:"_links"`
	}

	ActuatorLink struct {
		Href     string `json:"href"`
		Template bool   `json:"template"`
	}
)

type (
	HealthResp struct {
		Status     string                         `json:"status"`
		Components map[string]HealthComponentResp `json:"components"`
	}

	HealthComponentResp struct {
		Status  string         `json:"status"`
		Details map[string]any `json:"details"`
	}
)

type (
	MetricsResp struct {
		Names []string `json:"names"`
	}

	MetricResp struct {
		Name           string                `json:"name"`
		Description    string                `json:"description"`
		BaseUnit       string                `json:"baseUnit"`
		Measurements   []MetricMeasurement   `json:"measurements"`
		AvaialableTags []MetricAvaialableTag `json:"availableTags"`
	}

	MetricMeasurement struct {
		Statistic string `json:"statistic"`
		Value     any    `json:"value"`
	}

	MetricAvaialableTag struct {
		Tag    string   `json:"tag"`
		Values []string `json:"values"`
	}

	MetricLatestResp struct {
		Name string `json:"name"`
		// Description string            `json:"description"`
		// BaseUnit    string            `json:"baseUnit"`
		Value MetricLatestValue `json:"value"`
	}

	MetricLatestValue struct {
		Value     any       `json:"value"`
		Timestamp time.Time `json:"timestamp"`
	}
)

type (
	EnvResp struct {
		ActiveProfiles  []string            `json:"activeProfiles"`
		PropertySources []EnvPropertySource `json:"propertySources"`
	}

	EnvPropertySource struct {
		Name       string                 `json:"name"`
		Properties map[string]EnvProperty `json:"properties"`
	}

	EnvProperty struct {
		Value any `json:"value"`
	}

	EnvPropertyResp struct {
		Property struct {
			Source string `json:"source"`
			Value  any    `json:"value"`
		}
		ActiveProfiles  []string            `json:"activeProfiles"`
		DefaultProfiles []string            `json:"defaultProfiles"`
		PropertySources []EnvPropertySource `json:"propertySources"`
	}
)

type (
	ConditionsResp struct {
		Contexts map[string]ConditionsContext `json:"contexts"`
	}

	ConditionsContext struct {
		NegativeMatches      map[string]ConditionNegativeMatch `json:"negativeMatches"`
		PositiveMatches      map[string][]ConditionMatch       `json:"positiveMatches"`
		UnconditionalClasses []string                          `json:"unconditionalClasses"`
	}

	ConditionNegativeMatch struct {
		NotMatched []ConditionMatch `json:"notMatched"`
		Matched    []ConditionMatch `json:"matched"`
	}

	ConditionMatch struct {
		Condition string `json:"condition"`
		Message   string `json:"message"`
	}
)

type (
	ConfigpropsResp struct {
		Contexts map[string]ConfigpropsContext `json:"contexts"`
	}

	ConfigpropsContext struct {
		ParentId string                     `json:"parentId"`
		Beans    map[string]ConfigpropsBean `json:"beans"`
	}

	ConfigpropsBean struct {
		Prefix     string                 `json:"prefix"`
		Inputs     map[string]interface{} `json:"inputs"`
		Properties map[string]interface{} `json:"properties"`
	}
)

type (
	LoggersResp struct {
		Levels  []string               `json:"levels"`
		Loggers map[string]Logger      `json:"loggers"`
		Groups  map[string]LoggerGroup `json:"groups"`
	}

	Logger struct {
		ConfiguredLevel string `json:"configuredLevel"`
		EffectiveLevel  string `json:"effectiveLevel"`
	}

	LoggerGroup struct {
		ConfiguredLevel string   `json:"configuredLevel"`
		Members         []string `json:"members"`
	}

	LoggerOrGroupResp struct {
		ConfiguredLevel string   `json:"configuredLevel"`
		EffectiveLevel  string   `json:"effectiveLevel"`
		Members         []string `json:"members"`
	}

	LoggerLevelReq struct {
		ConfiguredLevel string `json:"configuredLevel"`
	}
)

type (
	CachesResp struct {
		CacheManagers map[string]CacheManager `json:"cacheManagers"`
	}

	CacheManager struct {
		Caches map[string]CacheResp `json:"caches"`
	}

	CacheResp struct {
		Target string `json:"target"`
	}
)

type (
	BeansResp struct {
		Contexts map[string]BeansContext `json:"contexts"`
	}

	BeansContext struct {
		ParentId string          `json:"parentId"`
		Beans    map[string]Bean `json:"beans"`
	}

	Bean struct {
		Aliases      []string `json:"aliases"`
		Scope        string   `json:"scope"`
		Type         string   `json:"type"`
		Resource     string   `json:"resource"`
		Dependencies []string `json:"dependencies"`
	}
)

type (
	MappingsResp struct {
		Contexts map[string]MappingsContext `json:"contexts"`
	}

	MappingsContext struct {
		Mappings Mappings `json:"mappings"`
	}

	Mappings struct {
		DispatcherServlets struct {
			DispatcherServlet []DispatcherServlet `json:"dispatcherServlet"`
		} `json:"dispatcherServlets"`
		// DispatcherHandlers []DispatcherServlet `json:"dispatcherHandlers"`
		Servlets       []Servlet       `json:"servlets"`
		ServletFilters []ServletFilter `json:"servletFilters"`
	}

	DispatcherServlet struct {
		Details   *Details `json:"details"`
		Handler   string   `json:"handler"`
		Predicate string   `json:"predicate"`
	}

	Details struct {
		HandlerMethod            HandlerMethod            `json:"handlerMethod"`
		RequestMappingConditions RequestMappingConditions `json:"requestMappingConditions"`
	}

	HandlerMethod struct {
		ClassName  string `json:"className"`
		Name       string `json:"name"`
		Descriptor string `json:"descriptor"`
	}

	RequestMappingConditions struct {
		Consumes []Produce `json:"consumes"`
		Headers  []Header  `json:"headers"`
		Methdos  []string  `json:"methods"`
		Params   []Header  `json:"params"`
		Patterns []string  `json:"patterns"`
		Produces []Produce `json:"produces"`
	}

	Produce struct {
		MediaType string `json:"mediaType"`
		Negated   bool   `json:"negated"`
	}

	Header struct {
		Name    string `json:"name"`
		Negated bool   `json:"negated"`
		Value   string `json:"value"`
	}

	Servlet struct {
		Mappings  []string `json:"mappings"`
		Name      string   `json:"name"`
		ClassName string   `json:"className"`
	}

	ServletFilter struct {
		ServletNameMappings []string `json:"servletNameMappings"`
		UrlPatternMappings  []string `json:"urlPatternMappings"`
		Name                string   `json:"name"`
		ClassName           string   `json:"className"`
	}
)

type (
	HttpExchangesResp struct {
		Exchanges []HttpExchange `json:"exchanges"`
	}

	HttpExchange struct {
		Timestamp time.Time    `json:"timestamp"`
		Request   HttpRequest  `json:"request"`
		Response  HttpResponse `json:"response"`
		TimeTaken string       `json:"timeTaken"`
	}

	HttpRequest struct {
		URI     string              `json:"uri"`
		Method  string              `json:"method"`
		Headers map[string][]string `json:"headers"`
	}

	HttpResponse struct {
		Status  int                 `json:"status"`
		Headers map[string][]string `json:"headers"`
	}
)

type (
	ScheduledTasksResp struct {
		Cron       []Cron       `json:"cron"`
		Cusotm     []Custom     `json:"custom"`
		FixedDelay []FixedDelay `json:"fixedDelay"`
		FixedRate  []FixedRate  `json:"fixedRate"`
	}

	Cron struct {
		Expression    string        `json:"expression"`
		NextExecution NextExecution `json:"nextExecution"`
		LastExecution LastExecution `json:"lastExecution"`
		Runnable      Runnable      `json:"runnable"`
	}

	Custom struct {
		Runnable      Runnable      `json:"runnable"`
		Trigger       string        `json:"trigger"`
		LastExecution LastExecution `json:"lastExecution"`
	}

	FixedDelay struct {
		InitialDelay  int           `json:"initialDelay"`
		Interval      int           `json:"interval"`
		LastExecution LastExecution `json:"lastExecution"`
		NextExecution NextExecution `json:"nextExecution"`
		Runnable      Runnable      `json:"runnable"`
	}

	FixedRate struct {
		InitialDelay  int           `json:"initialDelay"`
		Interval      int           `json:"interval"`
		LastExecution LastExecution `json:"lastExecution"`
		Runnable      Runnable      `json:"runnable"`
	}

	Runnable struct {
		Target string `json:"target"`
	}

	NextExecution struct {
		Time string `json:"time"`
	}

	LastExecution struct {
		Time      string    `json:"time"`
		Status    string    `json:"status"`
		Exception Exception `json:"exception"`
	}

	Exception struct {
		Message string `json:"message"`
		Type    string `json:"type"`
	}
)

type (
	QuartzResp struct {
		Jobs     Groups `json:"jobs"`
		Triggers Groups `json:"triggers"`
	}

	Groups struct {
		Groups []string `json:"groups"`
	}

	JobsResp struct {
		Groups map[string]Jobs `json:"groups"`
	}

	Jobs struct {
		Jobs []string `json:"jobs"`
	}

	JobsGroupResp struct {
		Group string `json:"group"`
		Jobs  map[string]struct {
			ClassName string `json:"className"`
		} `json:"jobs"`
	}

	TriggersResp struct {
		Groups map[string]TriggersGroup `json:"groups"`
	}

	TriggersGroup struct {
		Group    *string  `json:"group"`
		Paused   bool     `json:"paused"`
		Triggers []string `json:"triggers"`
	}

	TriggersGroupResp struct {
		Group    string `json:"group"`
		Paused   bool   `json:"paused"`
		Triggers struct {
			Cron                    CronTrigger              `json:"cron"`
			Simple                  SimpleTrigger            `json:"simple"`
			DailyTimeInterval       DailyTimeIntervalTrigger `json:"dailyTimeInterval"`
			CalendarIntervalTrigger CalendarIntervalTrigger  `json:"calendarInterval"`
			CustomTrigger           CustomTrigger            `json:"custom"`
		} `json:"triggers"`
	}

	JobDetailResp struct {
		ClassName       string            `json:"className"`
		Data            map[string]string `json:"data"`
		Description     string            `json:"description"`
		Durable         bool              `json:"durable"`
		Group           string            `json:"group"`
		Name            string            `json:"name"`
		RequestRecovery bool              `json:"requestRecovery"`
		Triggers        []JobTrigger      `json:"triggers"`
	}
	JobTrigger struct {
		Group            string `json:"group"`
		Name             string `json:"name"`
		PreviousFireTime string `json:"previousFireTime"`
		NextFireTime     string `json:"nextFireTime"`
		Priority         int    `json:"priority"`
	}

	TriggerDetailResp struct {
		Group                   string                   `json:"group"`
		Name                    string                   `json:"name"`
		Description             string                   `json:"description"`
		State                   string                   `json:"state"`
		Type                    string                   `json:"type"`
		CalendarName            string                   `json:"calendarName"`
		StartTime               string                   `json:"startTime"`
		EndTime                 string                   `json:"endTime"`
		PreviousFireTime        string                   `json:"previousFireTime"`
		NextFireTime            string                   `json:"nextFireTime"`
		Priority                int                      `json:"priority"`
		FinalFireTime           string                   `json:"finalFireTime"`
		Data                    map[string]string        `json:"data"`
		Cron                    CronTrigger              `json:"cron"`
		Simple                  SimpleTrigger            `json:"simple"`
		DailyTimeInterval       DailyTimeIntervalTrigger `json:"dailyTimeInterval"`
		CalendarIntervalTrigger CalendarIntervalTrigger  `json:"calendarInterval"`
		CustomTrigger           CustomTrigger            `json:"custom"`
	}

	CronTrigger struct {
		Expression string `json:"expression"`
		TimeZone   string `json:"timeZone"`
	}

	SimpleTrigger struct {
		Interval       int `json:"interval"`
		RepeatCount    int `json:"repeatCount"`
		TimesTriggered int `json:"timesTriggered"`
	}

	DailyTimeIntervalTrigger struct {
		Interval       int      `json:"interval"`
		DaysOfWeek     []string `json:"daysOfWeek"`
		StartTimeOfDay string   `json:"startTimeOfDay"`
		EndTimeOfDay   string   `json:"endTimeOfDay"`
		RepeatCount    int      `json:"repeatCount"`
		TimesTriggered int      `json:"timesTriggered"`
	}

	CalendarIntervalTrigger struct {
		Interval                               int    `json:"interval"`
		TimeZone                               string `json:"timeZone"`
		TimesTriggered                         int    `json:"timesTriggered"`
		PreserveHourOfDayAcrossDaylightSavings bool   `json:"preserveHourOfDayAcrossDaylightSavings"`
		SkipDayIfHourDoesNotExist              bool   `json:"skipDayIfHourDoesNotExist"`
	}

	CustomTrigger struct {
		Trigger []string `json:"trigger"`
	}
)

type (
	TogglzResp []Togglz

	Togglz struct {
		Name     string         `json:"name"`
		Enabled  bool           `json:"enabled"`
		Strategy *string        `json:"strategy"`
		Params   map[string]any `json:"params"`
		Metadata struct {
			Label            string `json:"label"`
			Groups           []any  `json:"groups"`
			EnabledByDefault bool   `json:"enabledByDefault"`
			Attributes       any    `json:"attributes"`
		} `json:"metadata"`
	}

	TogglzReq struct {
		Enabled    bool    `json:"enabled"`
		Strategy   *string `json:"strategy"`
		Parameters *string `json:"parameters"`
	}
)
