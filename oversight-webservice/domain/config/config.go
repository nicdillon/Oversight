package config

import (
	"encoding/json"
)

type Config struct {
	//SqlConnectionString string `json:"SqlConnectionString"`
}

func parseConfig(b []byte) Config {
	var config Config
	err := json.Unmarshal(b, &config)
	if err != nil {
		panic(err)
	}
	return config
}

// func GetConnectionString() (string, error) {
// 	fileData, err := ioutil.ReadFile("config.json")
// 	if err != nil {	
// 		return "", err
// 	}

// 	config := parseConfig(fileData)

// 	return config.SqlConnectionString, nil
// }