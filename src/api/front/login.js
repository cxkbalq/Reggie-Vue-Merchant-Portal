import FrontRequst from "@/js/FrontRequst";
export function loginApi(data) {
    return FrontRequst({
      'url': '/user/login',
      'method': 'post',
      data
    })
}

export function sendMsgApi(data) {
    return FrontRequst({
        'url': '/user/sendMsg',
        'method': 'post',
        data
    })
}

export function loginoutApi() {
  return FrontRequst({
    'url': '/user/loginout',
    'method': 'post',
  })
}

