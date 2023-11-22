import Vue from 'vue'; // 确保导入 Vue
export function rootpanduan(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.root == 3 || userInfo?.root == 3) {
      Vue.prototype.$message({
        message: '你的权限不足，无法进行操作',
        type: 'error',
        duration: 5 * 1000,
      });
      return true;
    }
    return false;
}
