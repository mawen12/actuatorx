package api

import (
	"net/http"

	"github.com/mawen12/actuatorx/static"

	"github.com/gin-gonic/gin"
)

func GetHome(prefix string) http.Handler {
	if prefix != "" {
		prefix = "/" + prefix
	}

	return http.StripPrefix(prefix, static.GetHandler())
}

func GetAssets(prefix string) http.Handler {
	if prefix != "" {
		prefix = "/" + prefix + "/static"
	} else {
		prefix = "/static"
	}

	return http.StripPrefix(prefix, static.GetHandler())
}

func GetInfo(c *gin.Context) {
	successResp(c, gin.H{})
}
