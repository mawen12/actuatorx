# Stage 1: Compile the binary in a containered Golang environment
# 
FROM golang:1.25.7 as build

# Copy source files from the host.
# The build context excludes frontend sources via .dockerignore (e.g. ui/).
COPY . /src

# Set the working directory to the same place we copied the code
WORKDIR /src

# Build the binary!
RUN mkdir -p logs && chmod 755 logs
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -mod=vendor -ldflags="-s -w" -o=actuatorx_linux_arm64 ./cmd/actuatorx

# Stage 2: Build the Logs-Viewer image proper
#
# Use a "scratch" image, which contains no distribution files
FROM scratch

# Copy the binary from the build container
COPY --from=build src/actuatorx_linux_arm64 .

COPY --from=build src/logs .

# Tell Docker we'll be using port 4000
EXPOSE 4000

# Tell Docker to execute this command on a "docker run"
CMD ["/actuatorx_linux_arm64"]
