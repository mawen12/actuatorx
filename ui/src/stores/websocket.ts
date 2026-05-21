import { defineStore } from "pinia";

export const useWebsocketStore = defineStore({
    id: 'websocket',
    state: () => ({
        uid: '',
        status: "open",
        err: null,
    }),

    getters: {
        getUid: (state) => state.uid
    },

    actions: {
        setUid(uid) {
            this.uid = uid
        },

        setStatus(status) {
            this.status = status
        },

        setErr(err) {
            this.err = err
        }
    }
})