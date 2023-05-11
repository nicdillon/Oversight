package interfaces

import "database/sql"

type SqlObject interface {
	Scan(row *sql.Row)
	String()
}