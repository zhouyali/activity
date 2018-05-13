var setupWebViewJavascriptBridge = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}

function toNum(a) {
    let oldVer;
    if (typeof a === 'string') {
        oldVer = a.toString();
        let newVer = oldVer.split('.');
        const numplace = ['', '0', '00', '000', '0000'];
        const r = numplace.reverse();
        for (let i = 0, leng = newVer.length; i < leng; i++) {
            const len = newVer[i].length;
            newVer[i] = r[len] + newVer[i];
        }
        const res = newVer.join('');
        return res;
    }
}
function getBaseUrl(){
    var baseUrl = window.location.protocol + '//' + window.location.host;
    return baseUrl;
}
const setCookie = (name, value, iDay) => { // 给浏览器设置cookie
    if (iDay === 0) {
        document.cookie = name + '=' + value
    } else {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + '; expires=' + exp.toGMTString();
    }
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}
// 当前页面host;
function getHttp() {
    var domin = '';
    if (location.host.search(/m.gomefund.com/ig) !== -1) {
        domin = 'https://' + location.host;
    } else if (location.host.search(/m-gray.gomefund.com/ig) !== -1) {
        domin = 'https://' + location.host;
    } else if (location.host.search(/m-test.gomefund.com/ig) !== -1) {
        domin = 'https://' + location.host;
    } else if (location.host.search(/localhost:3000/ig) !== -1) {
        domin = 'http://' + location.host;
    } else {
        domin = 'https://' + location.host;
    }
    alert(domin)
    return domin
}

const GOLD_BRIDGE = {
    setVersion: function () {
        var newRes = null;
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('gome_parmaslist', function (response) {
                newRes = JSON.parse(response);
                setCookie('newRes', newRes.gome_version, 100);
            })
        })
    },
    getVersion:function(){
        return getCookie('newRes');
    },
    goToNative: function (options) { // 新交互跳转
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('gome_fund', options);
        })
    },
    hideTab: function (options) { // 新交互跳转
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('gome_hidden', options);
        })
    },
    checkLogin: function (options) { // 新交互跳转
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('login', options);
        })
    },
    secondpage: function (path) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('gome_secondpage', path);
        });
    },
    checkVersion: function (a, b) { // 比较版本号传值为字符串格式
        const _a = toNum(a);
        const _b = toNum(b);
        if (_a === _b) return true;
        if (_a > _b) return true;
        if (_a < _b) return false;
    }
}

export default GOLD_BRIDGE;
