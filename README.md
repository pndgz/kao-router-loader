# [koa-router-loader](https://github.com/pndgz/koa-router-loader)

> koa2 router loader

## using in koa2
        const Koa = require('koa')
        const app = new Koa()
        const loader = require('koa-router-loader')
        ……
        // load routers in directory routes recursive
        // the directory path is the prefix of router
        // eg. file routes/users/user.js, the route path is [/base]/users/**
        const options = {
          verbose: true,  //console log loading info
          base: '/api' //route path base prefix
        }
        loader(app, 'routes', options)
