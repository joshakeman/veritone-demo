package main

import "shopping"

func main() {
	db := shopping.Connect()
	repo := shopping.NewItemRepo(db)
	shopping.RunServer(repo)
}
