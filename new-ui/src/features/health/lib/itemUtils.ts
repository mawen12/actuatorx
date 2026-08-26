export const getItemHealthStatusColor = (status: string) => {
    switch (status) {
        case 'UP':
            return 'text-green-600'
        case 'DOWN':
            return 'text-red-600'
        case 'OUT_OF_SERVICE':
            return 'text-yellow-600'
        case 'UNREACHABLE':
            return 'text-pink-600'
        case 'UNKNOWN':
            return 'text-blue-600'
        case 'INVALID':
            return 'text-purple-600'
        case 'PENDING':
            return 'text-primary'
        default:
            return undefined
    }
}

export const getHealthStatusColor = (status: string) => {
    switch (status) {
        case 'UP':
            return 'text-green-600'
        case 'DOWN':
            return 'text-red-600'
        case 'OUT_OF_SERVICE':
            return 'text-yellow-600'
        case 'UNREACHABLE':
            return 'text-pink-600'
        case 'UNKNOWN':
            return 'text-blue-600'
        case 'INVALID':
            return 'text-purple-600'
        case 'PENDING':
            return 'text-primary'
        default:
            return undefined
    }
}

export const getItemHealthStatusText = (status: string) => {
    switch (status) {
        case 'UP':
            return 'Up'
        case 'DOWN':
            return 'Down'
        case 'OUT_OF_SERVICE':
            return 'Out of Service'
        case 'UNREACHABLE':
            return 'Unreachable'
        case 'UNKNOWN':
            return 'Unknown'
        case 'INVALID':
            return 'Invalid'
        case 'PENDING':
            return 'Pending'
        default:
            return undefined
    }
}
