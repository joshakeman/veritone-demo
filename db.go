package shopping

import (
	"log"

	"github.com/jinzhu/gorm"
)

func Connect() *gorm.DB {
	dsn := "host=localhost user=shopping password=shopping dbname=shopping port=9920 sslmode=disable"
	db, err := gorm.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

type Item struct {
	gorm.Model

	UUID        string `json:"uuid"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ItemRepo struct {
	db *gorm.DB
}

func NewItemRepo(db *gorm.DB) *ItemRepo {
	return &ItemRepo{
		db: db,
	}
}

func (i *ItemRepo) ListAll() ([]Item, error) {
	var items []Item

	err := i.db.Find(&items).Error
	if err != nil {
		return []Item{}, err
	}

	return items, nil
}