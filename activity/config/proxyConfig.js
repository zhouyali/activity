// module.exports = {
//   proxy: {
//     '/api': {
//       target: 'http://101.201.154.210:9004',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': ''
//       },
//       secure: false
//     }
//   }
// }
module.exports = {
      proxy: {
        '/getProduct': {
          target: 'http://101.201.154.210:9004',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/getProduct': ''
          // },
          secure: false
        }
      }
    }