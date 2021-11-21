package shopping

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rs/cors"

	"github.com/gorilla/mux"
)

func RunServer(itemRepo *ItemRepo) {
	r := mux.NewRouter()
	dir := "./static"
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(dir))))

	r.HandleFunc("/api/list-all", ListAll(itemRepo))
	r.HandleFunc("/api/create", Create(itemRepo))
	// r.HandleFunc("/api/update", Update)
	// r.HandleFunc("/api/delete", Delete)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)
	log.Println("Running server ...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func corsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		return
	}
}

func ListAll(data *ItemRepo) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Retrieving all items ...")
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
