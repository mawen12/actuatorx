class ApiError extends Error {
    constructor(message, status, details = {}) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.details = details
    }

    isNotFound() {
        return this.status === 404
    }

    isUnauthorized() {
        return this.status === 401
    }

    isForbidden() {
        return this.status === 403
    }

    isServerError() {
        return this.status >= 500
    }
}
