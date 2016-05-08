// Package api contains all API calls
package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"../db"

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

// Get is API call to get all the blogs in DB
func Get() ([]byte, error) {
	// Connect to database
	// Get all data from table "Blogs"
	res, err := rethink.DB("api").Table("blogs").OrderBy("id").Run(db.Session)
	if err != nil {
		log.Println("getBlogs Database error")
	}
	defer res.Close()

	// If no data in table return error
	if res.IsNil() {
		log.Println("GetBlogs Row not found")
	}

	// Converting all database table info to struct format
	var blogs []Blogs
	err = res.All(&blogs)
	if err != nil {
		log.Println("getBlogs Error scanning database")
	}

	// Sending Database info as JSON to request
	result, err := json.Marshal(blogs)
	if err != nil {
		log.Printf("getBlogs json marshal error")
	}

	return result, err
}

// Add is API call to Add Blog in DB
func Add(r *http.Request) error {
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
		}}).RunWrite(db.Session)
	if err != nil {
		log.Println("could NOT Add to Database")
	}
	// Will print 1 row inserted
	fmt.Printf("%d row inserted \n", resp.Inserted)

	return err
}

// Delete is API Call to delete blog from DB
func Delete(r *http.Request) error {
	// Getting the JSON sent from Frontend
	// And then decoding the JSON to Blog Struct
	var b Blogs
	json.NewDecoder(r.Body).Decode(&b)
	// Show the result
	fmt.Printf("%v \n", b)

	// Removing the Blog Post from RethingDB
	// TODO Add Validation
	resp, err := rethink.DB("api").Table("blogs").Get(b.ID).Delete().RunWrite(db.Session)
	if err != nil {
		log.Println("coult NOT Delete from Database")
	}
	// will print 1 row deleted in console
	fmt.Printf("%d row deleted \n", resp.Deleted)

	return err
}

// Edit is API call to Edit Blog in DB
func Edit(r *http.Request) error {
	// Getting the JSON sent from Frontend
	// And then decoding the JSON to Blog Struct
	var b Blogs
	json.NewDecoder(r.Body).Decode(&b)
	// Show the result
	fmt.Printf("%v \n", b)

	// Adding the JSON / Blog Struct to RethingDB
	// TODO Add Validation
	resp, err := rethink.DB("api").Table("blogs").Get(b.ID).Update(Blogs{
		ID: b.ID,
		Blog: Blog{
			Author:  b.Author,
			Title:   b.Title,
			Content: b.Content,
		}}).RunWrite(db.Session)
	if err != nil {
		log.Println("coult NOT Edit to Database")
	}
	// Will print 1 row replaced
	fmt.Printf("%d row replaced \n", resp.Replaced)

	return err
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
func logout(s string) {
	fmt.Println(s)
}
