package db

import (
    "database/sql"
    "fmt"
)

func ExecuteQuery(db *sql.DB, query string, args ...interface{}) (sql.Result, error) {
    result, err := db.Exec(query, args...)
    if err != nil {
        return nil, fmt.Errorf("error executing query: %v", err)
    }
    return result, nil
}

func GetSingleRow(db *sql.DB, query string, args ...interface{}) *sql.Row {
    result := db.QueryRow(query, args...)
    return result
}

func GetMultipleRows(db *sql.DB, query string, args ...interface{}) (*sql.Rows, error) {
    results, err := db.Query(query, args...)
    if err != nil {
        return nil, fmt.Errorf("error executing query: %v", err)
    }
    defer results.Close()

    return results, nil
}