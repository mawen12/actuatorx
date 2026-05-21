<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useWebsocketStore } from '@/stores/websocket'

const client = ref(null)
const wsStore = useWebsocketStore()

const connect = () => {
    client.value = new Websocket(`ws://${window.location.origin}/ws`)

    client.value.onopen = () => {
        console.log('ws open');
    }

    client.value.onmessage = (event) => {
        console.log('ws receive message', event);
    }

    client.value.onclose = () => {
        console.warn('ws close');
    }

    client.value.onerror = (event) => {
        console.log('ws error', err);
    }
}

const disconnect = () => {
    if (client.value) {
        client.value.close()
        wsStore.setStatus("close")
    }
}

onMounted(connect)

onBeforeUnmount(disconnect)
</script>

<template>
    <slot />
</template>
