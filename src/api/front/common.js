var web_prefix = '/front'

export function imgPath(path){
    return 'http://127.0.0.1:8080/common/download?name=' + path
}

//将url传参转换为数组
export function parseUrl(url) {
    // 找到url中的第一个?号
    var parse = url.substring(url.indexOf("?") + 1),
        params = parse.split("&"),
        len = params.length,
        item = [],
        param = {};

    for (var i = 0; i < len; i++) {
        item = params[i].split("=");
        param[item[0]] = item[1];
    }

    return param;
}

