//设置一个通用键名

import { changeCount } from '@/api/cart'


//这个是user信息的本地
//这个是user信息的本地
const INFO_KEY='dengliObj'

export const getInfo=()=>{
  const def={token:'',userid:''}
  const res=localStorage.getItem(INFO_KEY)
  return res? JSON.parse(res):def
}
export const setInfo=(obj)=>{
  localStorage.setItem(INFO_KEY,JSON.stringify(obj))
}
export const remInfo=()=>{
  localStorage.removeItem(INFO_KEY)
}

//这个是search信息的本地
//这个是search信息的本地
const search='search'

export const getsearch=()=>{
  const def=[]
  const res=localStorage.getItem(search)
  return res? JSON.parse(res):def
}
export const setsearch=(obj)=>{
  localStorage.setItem(search,JSON.stringify(obj))
}
export const remsearch=()=>{
  localStorage.removeItem(search)
}
