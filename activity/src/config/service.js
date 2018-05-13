import axios from 'axios'
import qs from 'qs';
// import Base64 from '../tools/base64'
// import '../tools/creatToast'
axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
    // GomeJSBridge.showLoadingView()
    return config;
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.resolve(error.response)
})
const checkCodeStatus = (response) => {
    // 结束进度条或者加载动画
    if (response.status >= 200 && response.status <= 304) {
        // toast
        if (response.data.rntCode && response.data.rntCode !== 'OK') {
            $toast && $toast.showMsg(response.data.rntMsg);
        }
        return response;
    }
}

const checkCodeMsg = (res) => {
    if (res.code < 200 || res.code > 304) {
        $toast && $toast.showMsg('请求错误--from service.js')
        // GomeJSBridge.showErrorView()
    }
    console.log(res)
    return res;
}

// uat代理  /proxyapi/
// sit代理  /sitapi/
export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: '/sitapi/' + url,
            // url: '/proxyapi/' + url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(checkCodeStatus).catch(checkCodeMsg)
    },
    postIMG(url, data) {
        return axios({
            method: 'post',
            url: '/sitapi/' + url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'image/jpg'
            }
        }).then(checkCodeStatus).catch(checkCodeMsg)
    },    
    postCMS(url, data) {
        return axios({
            method: 'post',
            url: '/sitcmsapi/' + url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkCodeStatus).catch(checkCodeMsg)
    },
}
