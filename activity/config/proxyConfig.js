module.exports = {
  proxy: {
    '/proxyapi': {
      target: 'https://app.prd.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxyapi': ''
      },
      secure: false
    },
    '/sitapi': {
      target: 'http://10.145.200.25:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/sitapi': ''
      },
      secure: false
    },
    '/sitcmsapi': {
      target: 'http://cms.dbjb.com',
      changeOrigin: true,
      pathRewrite: {
          '^/sitcmsapi': ''
      },
      secure: false
    },
  }
}
