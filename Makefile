# ==================================================================================== #
# HELPERS
# ==================================================================================== #
## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

.PHONY: confirm
confirm:
	@echo -n 'Are you sure? [y/N] ' && read ans && [ $${ans:-N} = y ]


# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #
## run: run the cmd application
.PHONY: run
run:
	go run ./cmd/web --debug --handler-debug --pprof --port 5000

.PHONY: clean
clean:
	rm -rf bin

# ==================================================================================== #
# BUILD
# ==================================================================================== #
## build: build the amd64 and arm64 applications
.PHONE: build
build: clean build/amd64 build/arm64 build/win build/macos

## build/amd64: build the amd64 application
.PHONY: build/amd64
build/amd64:
	@echo 'Building linux_amd64...'
	cd ui && npm run build
	mkdir -p bin && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build  -o=bin/actuatorx ./cmd/web
	mkdir -p bin && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build  -o=bin/actuatorx_linux_amd64 ./cmd/web

## build/arm64: build the arm64 application
.PHONY: build/arm64
build/arm64:
	@echo 'Building linux_arm64...'
	cd ui && npm run build
	mkdir -p bin && GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -o=bin/actuatorx_linux_arm64 ./cmd/web

## build/win: build the windows application
.PHONY: build/win
build/win:
	@echo 'Building windows...'
	cd ui && npm run build
	mkdir -p bin && GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -o=bin/actuatorx_windows-amd64.exe ./cmd/web

## build/macos: build the macos application
.PHONY: build/macos
build/macos:
	@echo 'Building darwin...'
	cd ui && npm run build
	mkdir -p bin && GOOS=darwin GOARCH=arm64 CGO_ENABLED=0 go build -o=bin/actuatorx_darwin-arm64 ./cmd/web	

## build/docker: build the docker image
.PHONY: build/docker
build/docker:
	@echo 'Building docker image'
	cd ui && npm run build
	docker build -f Dockerfile -t actuatorx:0.1 .

## run/docker: run the docker container
.PHONY: run/docker
run/docker:
	docker rm -i actuatorx
	docker run -d --name actuatorx --network host localhost/actuatorx:0.1		