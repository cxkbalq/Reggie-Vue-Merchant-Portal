import FrontRequst from "@/js/FrontRequst";

export function getmendianPage  (params) {
  return FrontRequst({
    url: '/mendian',
    method: 'get',
    params
  })
}
export function getmendiansearch (params) {
  return FrontRequst({
    url: '/mendian/search',
    method: 'get',
    params
  })
}
