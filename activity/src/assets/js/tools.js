// 将url参数转换成对象
export const parseQueryString = function(url) {
    let reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, // g is very important
        arr_url = reg_url.exec(url),
        ret = {}
    if (arr_url && arr_url[1]) {
        let str_para = arr_url[1],
            result
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2]
        }
    }
    return ret
}

// 对象转数组
export function dataProcessing(object) {
    let keys = Object.keys(object)
    return keys.map(key => object[key])
}

export function cloneObj(obj) {
    let newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
        return obj
    }
    for (let i in obj) {
        newobj[i] = (typeof obj[i] === 'object' && obj[i] !== null) ?
            cloneObj(obj[i]) : obj[i]
    }
    return newobj

}

export function isPhone(num) {
    if (!(/^1[3|4|5|8|7]\d{9}$/.test(num))) {
        return false
    }
    return true

}
// 获取某个参数
export function getQueryString(name, url) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
        search = window.location.search
    if (url) {
        search = url.split('?')[1]
        search = search ? '?' + search : ''
    }

    let r = search.substr(1).match(reg)
    if (r != null) {
        return unescape(r[2])
    }
    return null
}
/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 * return URL参数字符串
 */
export function parseParam(param, key, encode) {
    if (param == null) return ''
    let paramStr = ''
    let t = typeof(param)
    if (t == 'string' || t == 'number' || t == 'boolean') {
        if (param !== '') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? param : param)
        }
    } else {
        for (let i in param) {
            let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += parseParam(param[i], k, encode)
        }
    }
    return paramStr
}
export function getBaseUrl() {
    var baseUrl = window.location.protocol + '//' + window.location.host;
    return baseUrl;
}
/* TODO 根据路由跳转新页面
targetPath:目标页面path 传路由的 path就可以(前头不带斜杠)
paramsKeys:params 路由传参方式参数
queryKeys:query 路由传参方式参数
 */
export function goTo(targetPath, queryKeys, paramsKeys) {
    //获取当前app版本 浏览器端打开则返回null
    $bridge.setVersion();
    var appVersion = $bridge.getVersion();
    //与目标app版本比较 确认是否为app内部打开
    var isApp = !!$bridge.checkVersion(appVersion, '4.11,0');
    //alert('当前APP版本:'+appVersion+'是否在App打开:'+ isApp+'当前路径'+'跳转后路径');
    //用于原生拼接于地址栏后侧 '?' 后的查询
    var queryKeysPath = json2Query(queryKeys);
    // alert('目标地址: ' + getBaseUrl() + '/' + targetPath + '?' + queryKeysPath)
    //若为app内部 则打开原生页面
    if (isApp) {
        $bridge.secondpage(getBaseUrl() + '/' + targetPath + '?' + queryKeysPath)
        //否则 路由打开并传参
    } else {
        this.$router.push({
            path: targetPath,
            query: queryKeys,
            params: paramsKeys
        })
    }
}
/* TODO 根据URL跳转新页面
url:目标页面url
 */
export function openUrl(url) {
    if(url.trim().length == 0){
        return false;
    }
    //获取当前app版本 浏览器端打开则返回null
    $bridge.setVersion();
    var appVersion = $bridge.getVersion();
    //与目标app版本比较 确认是否为app内部打开
    var isApp = !!$bridge.checkVersion(appVersion, '4.11,0');
    //若为app内部 则打开原生页面
    if (isApp) {
        $bridge.secondpage(url);
    } else {
        location.href = url;
    }
}
// TODO 将查询条件的json格式 转为浏览器问号后以'='链接的键值对
export function json2Query(jsonData) {
    var str = '';
    if (jsonData) {
        for (var keyItem in jsonData) {
            str += keyItem + '=' + jsonData[keyItem] + '&';
        }
        // 将最后一个 '&'干掉
        return str.split('').slice(0, -1).join('');
    } else {
        return '';
    }
}

export const setCookie = (name, value, iDay) => { // 给浏览器设置cookie
    if (iDay === 0) {
        document.cookie = name + '=' + value
    } else {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + '; expires=' + exp.toGMTString();
    }
}

export function getCookie(name) {
    var cookie = document.cookie;
    var arrCookie = cookie.split(';');
    for(var i=0;i<arrCookie.length;i++){  
        var arrCookieItem = arrCookie[i].split("=");  
        arrCookieItem[0] = arrCookieItem[0].replace(" ","");  
        if(arrCookieItem[0]==name){  
            return arrCookieItem[1];
        }  
    }  
}

export function removeCookie(name) {
    setCookie(name, "", -1);    
}

export function formatYMD(time,config={type:'yyyy-MM-DD',spliter:'/'}){
    if(config.type == 'yyyy-MM-DD'){
        var time = new Date(time);
        var year =time.getFullYear();
        var month = (time.getMonth()+1).length == 1 ? "0"+(time.getMonth()+1) : (time.getMonth()+1);
        var day = time.getDate().length == 1 ? "0"+time.getDate() : time.getDate();
        return year+config.spliter+month+config.spliter+day;
    }
}

export function sign_md5(str) {
    return hex_md5(str).toLowerCase();
}
export function getCookieToDeviceId(name) { 
     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
     return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}
export function GetDeviceId() {
    var deviceId = getCookieToDeviceId('deviceId');
    if(deviceId){
        return deviceId;
    } else {
       var str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
       deviceId = '';
       for (var i=0; i<30; i++) {
            deviceId += str[Math.floor(Math.random()*36)]
        }
       document.cookie = 'deviceId=' + deviceId;
       return deviceId;
    }
}

export function timeFormat(timestamp,connector,type) {
    //connector 为连接符 eg：YY-MM-DD中的'-',type为1时,返回时分秒,type为2时返回时分
    var Y,M,D,h,m,s,date;
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    if(timestamp.length == 10) {
        date = new Date(timestamp*1000)
    }else {
        date = new Date(timestamp)
    }
    if(connector) {
        Y = date.getFullYear() + connector;
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + connector;        
    }else {
        Y = date.getFullYear() + '.';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';        
    }
    D = date.getDate() + ' ';
    h = String(date.getHours());
    h.length == 2? h = h:h = '0'+h;
    m = String(date.getMinutes());
    m.length == 2? m = ':'+m:m = ':'+'0'+m;
    s = String(date.getSeconds()); 
    s.length == 2? s = ':'+s:s = ':'+'0'+s;   


    if(type && type == '1') {
        return Y+M+D+h+m+s ;
    }else if(type && type == '2') {
        return Y+M+D+h+m
    }else {
        return Y+M+D;
    }
}
export function toThousands (str) {
    var num = str.toString();
    var result = ''; 
    if(num.indexOf('.') > 0) {
        num = num.split('.');
        while (num[0].length > 3) {
            result = ',' + num[0].slice(-3) + result;
            num[0] = num[0].slice(0, num[0].length - 3);
        }  
        
        if (num) {
            result = num[0] + result+'.'+num[1];
        }             
    }else {
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }  
        if (num) {
            result = num + result;
        }         
    }
    return result;
}
export function doBase64(str) {
    var encrypt = new JSEncrypt();
    var _publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZKLkhmBJ+eRtsmOGGsOOnQb5TG7vM30W4enURyTytHMiVhnbB9lb1sBnqhUfUZf3Bjbr71RIxnMedAMJlqQ078bVOIMreOSv7+YFYBhFCDNR9hzgkttsTWk+yB0Nr1q4w3eQM+rpI1z/U/QBTWCgdHEq+4Q/I2OkCyjnBJqa8mQIDAQAB-----END PUBLIC KEY-----';
    encrypt.setPublicKey(_publickey);
    return encrypt.encrypt(str);
}

