// import request from "@/utils/request";
// import axiosPlugin from "@/js/request";
import TestRequst from "@/js/TestRequst";
import {request} from "axios";
// 获取成员列表
export function getMemberList(params) {
  return TestRequst({
    url: '/employee/page',
    method: 'get',
    params
  })
}

// 启用或禁用员工
export function enableOrDisableEmployee(params) {
  return TestRequst({
    url: '/employee',
    method: 'put',
    data: { ...params }
  })
}

// 添加员工
export function addEmployee(params) {
  return TestRequst({
    url: '/employee',
    method: 'post',
    data: { ...params }
  })
}

// 修改员工
export function editEmployee(params) {
  return TestRequst({
    url: '/employee',
    method: 'put',
    data: { ...params }
  })
}

// 根据ID查询员工详情
export function queryEmployeeById(id) {
  return TestRequst({
    url: `/employee/${id}`,
    method: 'get'
  })
}

// 添加购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return TestRequst.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
