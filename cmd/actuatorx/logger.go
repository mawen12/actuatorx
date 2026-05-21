package main

import (
	"errors"
	"fmt"
	"log/slog"
	"os"
	"strings"
	"time"

	"github.com/lmittmann/tint"
)

type Logger struct {
	file *os.File
}

func NewLogger(logfile string) (*Logger, error) {
	if logfile == "" {
		return nil, errors.New("logfile is empty")
	}

	_, err := os.Stat("logs")
	if os.IsNotExist(err) {
		if err := os.MkdirAll("logs", 0755); err != nil {
			return nil, fmt.Errorf("Create log directory: %v", err)
		}
	} else {
		return nil, err
	}

	dir, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("Access log directory: %v", err)
	}

	var logpath string
	if strings.HasSuffix(dir, "/") {
		logpath = fmt.Sprintf("%slogs/%s", dir, logfile)
	} else {
		logpath = fmt.Sprintf("%s/logs/%s", dir, logfile)
	}
	fmt.Println("logpath is", logpath)

	file, err := os.OpenFile(logpath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return nil, fmt.Errorf("Open log file: %v", err)
	}

	slog.SetDefault(slog.New(tint.NewHandler(file, &tint.Options{
		Level:      slog.LevelInfo,
		TimeFormat: time.RFC3339,
	})))

	return &Logger{
		file: file,
	}, nil
}

func (l *Logger) Close() {
	if l != nil && l.file != nil {
		l.file.Close()
	}
}
