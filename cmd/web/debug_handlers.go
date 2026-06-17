package main

import (
	"net/http"
)

func (app *application) ListClients(w http.ResponseWriter, r *http.Request) {
	uids := make([]string, 0)
	for uid := range app.clients {
		uids = append(uids, uid)
	}
	writeJson(w, r, uids)
}

func (app *application) DelClient(w http.ResponseWriter, r *http.Request) {
	uid := r.PathValue("uid")
	if uid == "" {
		http.Error(w, "uid parameter is required", http.StatusInternalServerError)
		return
	}

	delete(app.clients, uid)
	w.WriteHeader(200)
}

