package shopping

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func RunServer(itemRepo *ItemRepo) {
	r := mux.NewRouter()
	dir := "./static"
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(dir))))

	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	r.HandleFunc("/api/list-all", ListAll(itemRepo))
	r.HandleFunc("/api/create", Create(itemRepo))
	// r.HandleFunc("/api/update", Update)
	// r.HandleFunc("/api/delete", Delete)
	log.Println("Running server ...")
	log.Fatal(srv.ListenAndServe())
}

func ListAll(data *ItemRepo) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := data.ListAll()

		if err != nil {
			w.WriteHeader(500)
		}

		json.NewEncoder(w).Encode(items)
	}
}

func Create(data *ItemRepo) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var httpCreateReq Item
		json.NewDecoder(r.Body).Decode(&httpCreateReq)
		defer r.Body.Close()

		err := data.Create(httpCreateReq)

		if err != nil {
			w.WriteHeader(500)
		}

		w.WriteHeader(200)
	}
}
