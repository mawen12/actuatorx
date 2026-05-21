import {reactive} from 'vue'

export const beanGraphDialogState = reactive({
    visible: false,
    title: '',
    loading: false,
    data: {
        bean: undefined,
        allBeans: undefined,
    },
})

export function useBeanGraphDialog() {
    function open(options) {
        beanGraphDialogState.data.bean = options.bean
        beanGraphDialogState.data.allBeans = options.allBeans
        beanGraphDialogState.title = `Bean Graph - ${options.bean.name}`

        beanGraphDialogState.visible = true
        beanGraphDialogState.loading = false
    }

    function close() {
        beanGraphDialogState.visible = false
    }

    return {
        beanGraphDialogState,
        openBeanGraphDialog: open,
        closeBeanGraphDialog: close,
    }
}
