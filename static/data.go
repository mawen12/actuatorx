package static

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed index.html assets favicon.ico
var assets embed.FS

func GetFilesystem() http.FileSystem {
	sub, err := fs.Sub(assets, ".")
	if err != nil {
		panic(err)
	}
	return http.FS(sub)
}

func GetAssetsFilesystem() http.FileSystem {
	sub, err := fs.Sub(assets, "assets")
	if err != nil {
		panic(err)
	}
	return http.FS(sub)
}

func GetHandler() http.Handler {
	return http.FileServer(GetFilesystem())
}
