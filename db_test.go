package shopping_test

import (
	"testing"

	"shopping"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jinzhu/gorm"
)

// a successful case
func TestListAll(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	mock.ExpectBegin()
	rows := sqlmock.NewRows([]string{"uuid", "name", "description"}).
		AddRow(1, "tomato", "tomato description").
		AddRow(2, "milk", "milk description")
	mock.ExpectQuery("SELECT * from items").WillReturnRows(rows)
	mock.ExpectCommit()

	gormDB, err := gorm.Open("postgres", db)
	shopRepo := shopping.NewItemRepo(gormDB)
	// now we execute our method
	_, err = shopRepo.ListAll()
	if err != nil {
		t.Fatal(err)
	}

	// we make sure that all expectations were met
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}
