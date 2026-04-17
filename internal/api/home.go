package api

import (
	"net/http"

	"github.com/mawen12/actuatorx/static"

	"github.com/gin-gonic/gin"
)

func GetHome() http.Handler {
	return http.StripPrefix("", static.GetHandler())
}

func GetAssets() http.Handler {
	return http.StripPrefix("static", static.GetHandler())
}

func GetInfo(c *gin.Context) {
	successResp(c, gin.H{})
}
