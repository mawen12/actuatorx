.PHONY: ui-build go-build build clean run

BIN := bin/actuatorx
CMD := ./cmd/actuatorx

ui-build:
	cd ui && npm run build

go-build:
	mkdir -p bin
	go build -o ${BIN} ${CMD}

build: ui-build go-build

clean:
	rm -rf bin

run: build
	GIN_MODE=release ./${BIN}
