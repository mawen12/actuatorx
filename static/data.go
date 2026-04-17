package static

import (
	"embed"
	"io/fs"
	"net/http"
	"os"
)

//go:embed index.html assets
var assets embed.FS

func GetFilesystem() http.FileSystem {
	if os.Getenv("ACTUATOR_ASSETS_DEVMODE") == "1" {
		return http.Dir("./static")
	}
	return mustSubFS(".")
}

func GetAssetsFilesystem() http.FileSystem {
	if os.Getenv("ACTUATOR_ASSETS_DEVMODE") == "1" {
		return http.Dir("./static/assets")
	}
	return mustSubFS("assets")
}

func GetHandler() http.Handler {
	return http.FileServer(GetFilesystem())
}

func mustSubFS(dir string) http.FileSystem {
	sub, err := fs.Sub(assets, dir)
	if err != nil {
		panic(err)
	}
	return http.FS(sub)
}
