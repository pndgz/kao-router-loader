const fs = require('fs')
const path = require('path')

function _loadRoute(app, dir, options, settings) {
  let verbose = options.verbose || false
  options.base = options.base || ''
  let rootDir = path.resolve(settings.root, dir)
  verbose && console.log('find routers in %s', rootDir)
  fs.readdirSync(rootDir).forEach((name) => {
    let file = path.join(rootDir, name)
    if(fs.statSync(file).isDirectory()) {
      settings.root = rootDir
      settings.prefix += '/' + name
      _loadRoute(app, name, options, settings)
    } else {
      let router = require(file)
      verbose && console.log('use routes in %s', file)
      router.prefix(options.base + settings.prefix)
      app.use(router.routes(), router.allowedMethods())
    }
  })
}

module.exports = function (app, routesDir, options) {
  _loadRoute(app, routesDir, options, {root: '', prefix: ''})
}