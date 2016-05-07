package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	rethink "github.com/dancannon/gorethink"
)

// Blog is the blog struct that contain the Blog-form
type Blog struct {
	Author  string `gorethink:"author"`
	Title   string `gorethink:"title"`
	Content string `gorethink:"content"`
}

// Blogs is the blogs struct to
// formate it better before added to DB
type Blogs struct {
	ID   int `gorethink:"id"`
	Blog `gorethink:"blogs"`
}

// Make the DB Session Global
var session *rethink.Session

func init() {
	// Connecting to the database
	var err error
	session, err = rethink.Connect(rethink.ConnectOpts{
		Address: "localhost:28015",
	})
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	http.HandleFunc("/api/getblogs", getBlogs) // localhost:9000/api/getblogs
	http.HandleFunc("/api/addblog", addBlog)   // localhost:9000/api/addblog

	log.Fatal(http.ListenAndServe(":9000", nil)) // Server listening at localhost:9000
	log.Println("Server listening at localhost:9000 \n")
}

// Register is API call to Register a User (Add User to DB)
func register(s string) {
	fmt.Println(s)
}

// Login is API call to login (Check DB if exist)
func login(s string) {
	fmt.Println(s)
}

// Logout is API call to logout (delete cookie)
func logout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // Set header to JSON
	fmt.Fprintln(w, "Logout")
}

// GetBlogs is API call to get all the blogs in DB
func getBlogs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Header.Get("Origin"))
	w.Header().Set("Content-Type", "application/json") // Set header to JSON
	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers",
			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	}

	if r.Method == "GET" {
		// Connect to database
		// Get all data from table "Blogs"
		res, err := rethink.DB("api").Table("blogs").Run(session)
		if err != nil {
			log.Printf("getBlogs Database error: %s \n", err)
			return
		}
		defer res.Close()

		// If no data in table return error
		if res.IsNil() {
			log.Println("GetBlogs Row not found \n")
			return
		}

		// Converting all database table info to struct format
		var blogs []Blogs
		err = res.All(&blogs)
		if err != nil {
			log.Printf("getBlogs Error scanning database result: %s \n", err)
			return
		}
		// Sending Database info as JSON to request
		result, err := json.Marshal(blogs)
		if err != nil {
			log.Printf("getBlogs json marshal error: %s \n", err)
		}
		fmt.Fprint(w, string(result))
	}
}

// AddBlog is API call to Add Blog in DB
func addBlog(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Header.Get("Origin"))

	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers",
			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	}

	if r.Method == "POST" {
		// Getting the JSON sent from Frontend
		// And then decoding the JSON to Blog Struct
		var b Blogs
		json.NewDecoder(r.Body).Decode(&b)
		// Show the result
		fmt.Printf("%v \n", b)

		// Adding the JSON / Blog Struct to RethingDB
		// TODO Add Validation
		resp, err := rethink.DB("api").Table("blogs").Insert(Blogs{
			ID: b.ID,
			Blog: Blog{
				Author:  b.Author,
				Title:   b.Title,
				Content: b.Content,
			}}).RunWrite(session)
		if err != nil {
			log.Fatal(err)
			return
		}

		fmt.Printf("%d row inserted \n", resp.Inserted)
	}
}

// DeleteBlog is API Call to delete blog from DB
func deleteBlog(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // Set header to JSON
	fmt.Fprintln(w, "DeleteBlog")
}
