import { AxiosRequestConfig } from 'axios'

export type TEndpoint = {
	url: string,
	actions: {
		method: Lowercase<Exclude<AxiosRequestConfig['method'], undefined>>
		func: (...args: any[]) => void,
		validateSession?: boolean
	}[]
}