import {formatWidgetValue} from '@/utils/formatUtils'
import {isObject, toString} from 'lodash-es'

const healthDetailsFormatters = {
    'diskSpace.total': (value) => formatWidgetValue(value, 'bytes'),
    'diskSpace.free': (value) => formatWidgetValue(value, 'bytes'),
    'diskSpace.threshold': (value) => formatWidgetValue(value, 'bytes'),
    'diskSpace.exists': (value) => formatWidgetValue(value, 'boolean'),
}

const defaultValueFormatter = (value) => (isObject(value) ? JSON.stringify(value) : toString(value))

export const getHealthDetailsValueFormatter = (key) =>
    healthDetailsFormatters[key] || defaultValueFormatter

const healthDetailsKeyFormatters = {
    db: (key) => key.toUpperCase(),
}

const defaultKeyFormatter = (key) => {
    return key.replace(/([^A-Z])([A-Z])/g, '$1 $2')
}

export const getHealthDetailsKeyFormatter = (key) =>
    healthDetailsKeyFormatters[key] || defaultKeyFormatter
