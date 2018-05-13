console.log(process.env.NODE_ENV);


var API_LINK, HTML_LINK, STORE;

if (process.env.NODE_ENV === 'LIVE') {
    API_LINK = ''
    HTML_LINK = ''
} else if (process.env.NODE_ENV === 'PRE') {
    API_LINK = 'http://finance.mobilepre.atguat.com.cn:20101/apiservice.do'
    HTML_LINK = 'http://financeh5.mpre.atguat.com.cn:12345/'
    STORE = {
    }
} else if (process.env.NODE_ENV === 'UAT' || process.env.NODE_ENV === 'UAT-dev') {
    API_LINK = '//finance.mobile.atguat.com.cn:12345/apiservice.do'
    HTML_LINK = 'http://financeh5.m.atguat.com.cn:12345/'
    STORE = {
    }
} else {
    API_LINK = '//fund.mobile.atguat.com.cn:12345/apiservice.do'
    HTML_LINK = '//fundh5.m.atguat.com.cn:12345/'
}

export { API_LINK, HTML_LINK, STORE }
