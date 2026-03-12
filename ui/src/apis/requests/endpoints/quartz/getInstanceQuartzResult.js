import { axiosInstance } from '@/apis/axiosInstance'
import { useBaseMutation } from '@/apis/requests/base/useBaseMutation'
import { useBaseQuery } from '@/apis/requests/base/useBaseQuery'
import { apiKeys } from '@/apis/apiKeys'
import { getInstanceQuartz } from './getInstanceQuartz'
import { getInstanceQuartzJobs } from './getInstanceQuartzJobs'
import { getInstanceQuartzJob } from './getInstanceQuartzJob'
import { v4 as uuidv4 } from 'uuid'
import { getInstanceQuartzTriggers } from './getInstanceQuartzTriggers'
import { isEmpty } from 'lodash-es'
import { getInstanceQuartzTrigger } from './getInstanceQuartzTrigger'

export const getInstanceQuartzResult = async (variables) => {
  const quartz = await getInstanceQuartz(variables)
  const jobs = []
  for (let group of quartz.jobs.groups) {
    const jobRes = await getInstanceQuartzJobs({ ...variables, group })
    for (let name of Object.keys(jobRes.jobs)) {
      const job = await getInstanceQuartzJob({ ...variables, group, name })
      jobs.push({
        ...job,
        uid: uuidv4,
        search: `${job.name.toLowerCase()}${job.className.toLowerCase()}`,
      })
    }
  }

  const triggers = []
  for (let group of quartz.triggers.groups) {
    const triggerRes = await getInstanceQuartzTriggers({ ...variables, group })
    for (let type of Object.keys(triggerRes.triggers)) {
      if (!isEmpty(triggerRes.triggers[type])) {
        for (let name of Object.keys(triggerRes.triggers[type])) {
          const trigger = await getInstanceQuartzTrigger({ ...variables, group, name })
          triggers.push({
            ...trigger,
            uid: uuidv4,
            search: trigger.name.toLowerCase(),
          })
        }
      }
    }
  }

  return {
    jobs,
    triggers,
  }
}

export const useGetInstanceQuartzResult = (options) =>
  useBaseMutation(getInstanceQuartzResult, options)

export const useGetInstanceQuartzResultQuery = (variables, options) =>
  useBaseQuery(
    apiKeys.itemQuartz(variables.instanceId),
    getInstanceQuartzResult,
    variables,
    options,
  )
