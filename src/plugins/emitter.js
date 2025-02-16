import mitt from 'mitt'

export default {
    install (app) {
        const emitter = mitt();
        app.provide('emitter', emitter);
        app.config.globalProperties.$emitter = emitter;
    }
}
