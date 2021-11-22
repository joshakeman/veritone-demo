package main

import "shopping"

func main() {
	db := shopping.Connect()
	db.AutoMigrate(&shopping.Item{})

	repo := shopping.NewItemRepo(db)
	shopping.RunServer(repo)
}
