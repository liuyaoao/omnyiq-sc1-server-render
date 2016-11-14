import config from '../config'
import server from '../server/main'
import _debug from 'debug'

(async () => {
  const debug = _debug('app:bin:server')
  const port = config.server_port
  const host = config.server_host

//这里的server是一个es7语法里的async函数，然后通过返回promise对象实例，传出的是一个koa实例对象。
  let app = await server()

  app.listen(port)

  debug(`Server is now running at http://${host}:${port}.`)
  debug(`Server accessible via localhost:${port} if you are using the project defaults.`)
})()
