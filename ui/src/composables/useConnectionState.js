import {useStorage} from '@vueuse/core'

const connected = useStorage('connected', false)
const connectUrl = useStorage('connectUrl', null)
const drawer = useStorage('drawer', false)

const resetConnectionState = () => {
  connected.value = false
  connectUrl.value = null
  drawer.value = false
}

const setConnectedState = (url) => {
  connected.value = true
  connectUrl.value = url
  drawer.value = true
}

export const useConnectionState = () => ({
  connected,
  connectUrl,
  drawer,
  resetConnectionState,
  setConnectedState,
})
