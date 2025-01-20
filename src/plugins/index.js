import vuetify from './vuetify'
import http from './http'
import emitter from './emitter'

export function registerPlugins (app) {
    app
      .use(vuetify)
      .use(emitter)
      .use(http)
}