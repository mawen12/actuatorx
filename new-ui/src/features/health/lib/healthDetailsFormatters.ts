
import {isObject, toString} from 'lodash'
import { formatWidgetValue } from './formatUtils';
import type { JsonValue } from '@/apis/apiKeys';

type KeyFormatter = (key: string) => string
type ValueFormatter = (value: JsonValue) => string

const healthDetailsKeyFormatters: Record<string, KeyFormatter> = {
    db: (key: string) => key.toUpperCase(),
}

const defaultKeyFormatter = (key: string) => {
    return key.replace(/([^A-Z])([A-Z])/g, '$1 $2').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const getHealthDetailsKeyFormatter = (key: string) =>
    healthDetailsKeyFormatters[key] || defaultKeyFormatter

const healthDetailsFormatters: Record<string, ValueFormatter> = {
    'diskSpace.total': (value: JsonValue) => formatWidgetValue(value, 'bytes'),
    'diskSpace.free': (value: JsonValue) => formatWidgetValue(value, 'bytes'),
    'diskSpace.threshold': (value: JsonValue) => formatWidgetValue(value, 'bytes'),
    'diskSpace.exists': (value: JsonValue) => formatWidgetValue(value, 'boolean'),
}

const defaultValueFormatter = (value: JsonValue) => (isObject(value) ? JSON.stringify(value) : toString(value))

export const getHealthDetailsValueFormatter = (key: string) =>
    healthDetailsFormatters[key] || defaultValueFormatter

