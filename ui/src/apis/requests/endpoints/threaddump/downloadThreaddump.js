import { axiosInstance } from '@/apis/axiosInstance';
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation';

export const downloadThreaddump = async (variables) => {
    return (await axiosInstance.get(`threaddump/download`, {
        responseType: 'blob',
    })).data
}

export const useDownloadThreaddump = (options) => useBaseMutation(downloadThreaddump, options)
