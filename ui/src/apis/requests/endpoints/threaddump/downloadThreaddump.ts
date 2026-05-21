import {axiosInstance} from '@/apis/axiosInstance'
import {useBaseMutation} from '@/apis/requests/base/useBaseMutation'
import {useStorage} from "@vueuse/core";

const connectUrl = useStorage('connectUrl')

export const downloadThreaddump = async (variables) => {
    return (await axiosInstance.get(`threaddump/download`, {
        params: {
            url: connectUrl.value,
        },
        responseType: 'blob',
    })).data
}

export const useDownloadThreaddump = (options) => useBaseMutation(downloadThreaddump, options)
