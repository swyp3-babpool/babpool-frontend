import axios from "axios"

export const get = async (url: string, params: any) => {
    const res = await axios.get(url, params)
    return res.data
}
export const post = async (url: string, data: any, config: any) => {
    const res = await axios.post(url, data, config)
    return res.data
}