import {isArray, isNil, isNumber} from 'lodash-es'

export const roundNumber = (number, decimals) => {
    return parseFloat(number.toFixed(decimals))
}

export const padValue = (value) => (value < 10 ? `0${value}` : `${value}`)

export const formatBytes = (bytes) => {
    if (bytes >= 1024 * 1024 * 1024) {
        return `${roundNumber(bytes / 1024 / 1024 / 1024, 2)}GB`
    }
    return `${roundNumber(bytes / 1024 / 1024, 2)}MB`
}

export const formatCountDown = (millis) => {
    const days = Math.floor(millis / 86400000)
    const hours = Math.floor((millis % 86400000) / 3600000)
    const minutes = Math.floor((millis % 3600000) / 60000)
    const seconds = Math.floor((millis % 60000) / 1000)

    const d = days > 0 ? `${days}d ` : ''
    const h = `${padValue(hours)}h `
    const m = `${padValue(minutes)}m `
    const s = `${padValue(seconds)}s`

    return `${d}${h}${m}${s}`
}

export const formatInterval = (millis) => {
    if (millis === 0) {
        return '0'
    }

    const days = Math.floor(millis / 86400000)
    const hours = Math.floor((millis % 86400000) / 3600000)
    const minutes = Math.floor((millis % 3600000) / 60000)
    const seconds = Math.floor((millis % 60000) / 1000)
    const milliseconds = Math.floor(millis % 1000)

    const d = days > 0 ? `${days}d} ` : ''
    const h = hours > 0 ? `${hours}h ` : ''
    const m = minutes > 0 ? `${minutes}m ` : ''
    const s = seconds > 0 ? `${seconds}s` : ''
    const ms = milliseconds > 0 ? ` ${milliseconds}ms` : ''

    return `${d}${h}${m}${s}${ms}`
}

export const formatWidgetChartValue = (value, valueType) => {
    if (isNil(value) || !isNumber(value)) {
        return 0
    }
    switch (valueType) {
        case 'bytes':
            return roundNumber(value / 1024 / 1024, 0)
        default:
            return value
    }
}

export const formatWidgetValue = (value, valueType) => {
    if (isNil(value)) return ''

    switch (valueType) {
        case 'threads':
        case 'tasks':
        case 'number':
            return isNumber(value) ? roundNumber(value, 2).toString() : toString(value)
        case 'percent':
            return isNumber(value) ? `${(value * 100).toFixed(2)}%` : toString(value)
        case 'array':
            return isArray(value) ? value.join(', ') : toString(value)
        case 'bytes':
            return isNumber(value) ? formatBytes(value) : toString(value)
        case 'seconds':
            return isNumber(value) ? formatCountDown(value * 1000) : toString(value)
        case 'boolean':
            return value ? 'TRUE' : 'FALSE'
        case 'object':
            return JSON.stringify(value)
        case 'undefined':
        case 'null':
        default:
            return toString(value)
    }
}
