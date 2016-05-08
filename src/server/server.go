package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"./api"
)

func main() {
	// TODO Read about URL parsing so I dont need to use Gorilla Mux
	route := mux.NewRouter()
	// localhost:9000/api/:type (type = getBlogs, addBlog, editBlog, deleteBlog)
	route.HandleFunc("/api/{type}", apiHandler).Methods("GET, POST, OPTIONS")

	// Server listening at localhost:9000
	log.Fatal(http.ListenAndServe(":9000", route))
	log.Println("Server listening at localhost:9000")
}

// apiHandler is the main handler for all routes / API calls
func apiHandler(w http.ResponseWriter, r *http.Request) {
	// Allowing / Accepting everything as I am testing and developing
	origin := r.Header.Get("Origin")
	w.Header().Set("Content-Type", "application/json") // Set header to JSON
	w.Header().Set("Access-Control-Allow-Origin", origin)
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	// TODO create Authorization function (and cookies)
	// TODO create Validation function

	urlVars := mux.Vars(r)
	switch urlVars["type"] {
	case "getblogs": // localhost:9000/getblogs
		// Get the blogs from DB with API call Get()
		result, err := api.Get()
		if err != nil {
			log.Println(err)
		}
		// Send the result to the request
		fmt.Fprint(w, string(result))
	case "addblog": // localhost:9000/addblog
		if r.Method == "POST" {
			err := api.Add(r)
			if err != nil {
				log.Println(err)
			}
		}
	case "editblog": // localhost:9000/editblog
		if r.Method == "POST" {
			err := api.Edit(r)
			if err != nil {
				log.Println(err)
			}
		}
	case "deleteblog": // localhost:9000/deleteblog
		if r.Method == "POST" {
			err := api.Delete(r)
			if err != nil {
				log.Println(err)
			}
		}
	default:
		fmt.Fprint(w, "API call does not exist")
	}
}
