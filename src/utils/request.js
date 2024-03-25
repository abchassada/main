/* eslint-disable no-empty */
import axios from 'axios'
import { h } from 'vue'
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui'

export function request(config) {
    const instance = axios.create({
        baseURL: '/show',
        timeout: 5000,
        transformRequest: [function (data) {
            return qs.stringify(data);
        }],
    })
    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    instance.interceptors.request.use(config => {
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }, err => {
        console.log("请求拦截=>", err);
        return err;
    })
    instance.interceptors.response.use(res => {
        console.log("响应拦截=>", res.data);
        if (res.data.success == false) {
            Message({
                message: res.data.data.message + '，请重试！',
                type: 'warning'
            });
        }
        return res ? res.data : res;
    }, err => {
        console.log(err);
        console.log("响应拦截错误完整信息=>", err.response)
        throw err;
    })
    request.instance = instance;
    return instance(config);
}



// get方法
export const $get = async (url, params) => {
    const { data } = await instance.get(url, {
        params
    })
    return data
}
// postFrom
export const $postForm = async (url, params) => {
    const { data } = await instance.post(url, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
    return data
}

// post
export const $post = async (url, params) => {
    const { data } = await request.instance.post(url, params)

    return data
}

// put
export const $put = async (url, params) => {
    const { data } = await instance.put(url, params)
    return data
}

// delete
export const $delete = async (url, params) => {
    const { data } = await instance.delete(url,
        { data: params }
    )
    return data
}
