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
        '/getProduct/getSinaProduct': {
          target: 'http://sinagiftwebservice.lenovogift.com',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/getProduct': ''
          // },
          secure: false
        },
        '/ExchangedGood/SubmitProduct': {
          target: 'http://sinagiftwebservice.lenovogift.com',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/getProduct': ''
          // },
          secure: false
        }, 
        '/Verification/ORCodeVerification': {
          target: 'http://sinagiftwebservice.lenovogift.com',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/getProduct': ''
          // },
          secure: false
        },  
        '/Ebusiness/EbusinessOrderHandle.aspx': {
          target: 'http://api.kdniao.cc',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/getProduct': ''
          // },
          secure: false
        },  
                    
      }
    }