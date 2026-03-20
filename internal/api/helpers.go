package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/client"
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

func downloadResult(c *gin.Context, downloader client.Downloader, err error) {
	if err != nil {
		errorResp(c, http.StatusBadRequest, err)
		return
	}

	c.Header("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, downloader.Filename()))
	c.Data(http.StatusOK, "application/octet-stream", downloader.Bytes())
}
