package db

import (
	"log"

	rethink "github.com/dancannon/gorethink"
)

// Session is the DB Session connection (Globaly)
var Session *rethink.Session

func init() {
	// Connecting to the database
	var err error
	Session, err = rethink.Connect(rethink.ConnectOpts{
		Address: "localhost:28015",
	})
	if err != nil {
		log.Fatal(err)
	}
}
