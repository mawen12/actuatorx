package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mawen12/actuatorx/internal/client"
)

func readBool(qs url.Values, key string, defaultBool bool) bool {
	s := qs.Get(key)
	if s == "" {
		return defaultBool
	}

	return s == "true" || s == "1"
}

func writeJson(w http.ResponseWriter, r *http.Request, data any) {
	js, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		serveError(w, err)
		return
	}

	js = append(js, '\n')

	w.Header().Set("Content-Type", "application/json")
	{
		if start, ok := r.Context().Value("start").(time.Time); ok {
			w.Header().Set("Logs-Viewer-Cost-Ms", fmt.Sprint(time.Since(start).Milliseconds()))
		}
	}

	w.WriteHeader(200)
	w.Write(js)
}

func serveError(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

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
