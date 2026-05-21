import { defineStore } from "pinia";

export const useWebsocketStore = defineStore('websocket', {
    state: () => ({
        uid: '',
        status: "open",
        err: '',
    }),

    getters: {
        getUid: (state) => state.uid
    },

    actions: {
        setUid(uid: string) {
            this.uid = uid
        },

        setStatus(status: string) {
            this.status = status
        },

        setErr(err: string) {
            this.err = err
        }
    }
})