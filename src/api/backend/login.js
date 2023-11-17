import TestRequst from "@/js/BackendRequst";
export function loginApi(data) {
  return TestRequst({
    'url': '/employee/login',
    'method': 'post',
    data
  })
}
function sendMsgApi(data) {
  return $axios({
    'url': '/user/sendMsg',
    'method': 'post',
    data
  })
}


function logoutApi(){
  return $axios({
    'url': '/employee/logout',
    'method': 'post',
  })
}
