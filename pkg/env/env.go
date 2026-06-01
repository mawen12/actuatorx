package env

import (
	"os"
	"strconv"
)

func GetBool(key string, def bool) bool {
	valueStr, exists := os.LookupEnv(key)
	if !exists {
		return def
	}

	value, err := strconv.ParseBool(valueStr)
	if err != nil {
		return def
	}

	return value
}

func GetInt(key string, def int) int {
	valueStr, exists := os.LookupEnv(key)
	if !exists {
		return def
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return def
	}

	return value
}

func Get(key, def string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return def
	}

	return value
}
