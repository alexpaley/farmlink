package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mattbaird/gochimp"
)

const (
	MAILCHIMP_API_KEY = "23cc6196ad7a14d6574a0097eb3560a5-us5"
	MAILCHIMP_LIST_ID = "e17821b3b5"
)

var (
	port  = flag.String("port", "8080", "port number to run server on")
	chimp = gochimp.NewChimp(MAILCHIMP_API_KEY, true)
)

type ApiResult struct {
	Code    int
	Message string
}

func mailchimpHandler(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")
	fmt.Println(email)
	chimpReq := gochimp.ListsSubscribe{
		ApiKey: MAILCHIMP_API_KEY,
		ListId: MAILCHIMP_LIST_ID,
		Email: gochimp.Email{
			Email: email,
		},
		DoubleOptIn: false,
		SendWelcome: false,
	}

	chimpRes, err := chimp.ListsSubscribe(chimpReq)
	if err != nil {
		res := ApiResult{1, err.Error()}
		fmt.Sprintln("mailchimp error for %s: %s", email, err.Error())
		js, jsErr := json.Marshal(res)
		if jsErr != nil {
			http.Error(w, jsErr.Error(), http.StatusInternalServerError)
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.Write(js)
		}
	} else {
		res := ApiResult{0, chimpRes.Email}
		fmt.Println("success for ", chimpRes.Email)
		js, jsErr := json.Marshal(res)
		if jsErr != nil {
			http.Error(w, jsErr.Error(), http.StatusInternalServerError)
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.Write(js)
		}
	}
}

func main() {
	flag.Parse()
	r := mux.NewRouter()
	r.HandleFunc("/api/chimp", mailchimpHandler)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", *port), nil))
}
