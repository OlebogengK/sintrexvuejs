import AxiosHelper from '../axios/axios.helper'

export default {
    install (app)
    {
        const emitter = app.config.globalProperties.$emitter
        const http = new AxiosHelper(emitter)
        app.provide('http', http)
        app.config.globalProperties.$http = http
    }
}