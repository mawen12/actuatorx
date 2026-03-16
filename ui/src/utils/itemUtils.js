export const getItemHealthStatusColor = (item) => {
    switch (item.health.status) {
        case 'UP':
            return 'text-green'
        case 'DOWN':
            return 'text-red'
        case 'OUT_OF_SERVICE':
            return 'text-yellow'
        case 'UNREACHABLE':
            return 'text-pink'
        case 'UNKNOWN':
            return 'text-blue'
        case 'INVALID':
            return 'text-purple'
        case 'PENDING':
            return 'primary'
        default:
            return undefined
    }
}

export const getHealthStatusColor = (status) => {
    switch (status) {
        case 'UP':
            return 'text-green'
        case 'DOWN':
            return 'text-red'
        case 'OUT_OF_SERVICE':
            return 'text-yellow'
        case 'UNREACHABLE':
            return 'text-pink'
        case 'UNKNOWN':
            return 'text-blue'
        case 'INVALID':
            return 'text-purple'
        case 'PENDING':
            return 'text.primary'
        default:
            return undefined
    }
}

export const getItemHealthStatusText = (item) => {
    switch (item.health.status) {
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
