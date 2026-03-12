package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func successResp(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, data)
}

func errorResp(c *gin.Context, status int, err error) {
	c.AbortWithStatusJSON(status, gin.H{"status": status, "error": err.Error()})
}

func serverResult(c *gin.Context, data interface{}, err error) {
	if err != nil {
		errorResp(c, http.StatusBadRequest, err)
		return
	}

	successResp(c, data)
}
