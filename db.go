package shopping

import (
	"log"

	_ "github.com/jinzhu/gorm/dialects/postgres"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

func Connect() *gorm.DB {
	log.Println("Connecting to DB ...")
	dsn := "host=localhost port=5432 user=scriptcomposer dbname=postgres sslmode=disable password=pass"
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
	Amount      int    `json:"amount"`
}

type ItemRepo struct {
	db *gorm.DB
}

func NewItemRepo(db *gorm.DB) *ItemRepo {
	log.Println("Creating new item repo ...")
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

func (i *ItemRepo) Create(item Item) error {
	item.UUID = uuid.New().String()

	err := i.db.Create(&item).Error
	if err != nil {
		return err
	}

	return nil
}

func (i *ItemRepo) Update(item Item) error {
	err := i.db.Model(&Item{}).Where("uuid = ?", item.UUID).Updates(&item).Error
	if err != nil {
		return err
	}

	return nil
}

func (i *ItemRepo) Delete(uuid string) error {
	err := i.db.Delete(&Item{}).Where("uuid = ?", uuid).Error
	if err != nil {
		return err
	}

	return nil
}
