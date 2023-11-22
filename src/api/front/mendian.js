import FrontRequst from "@/js/FrontRequst";

export function getmendianPage  () {
  return FrontRequst({
    url: '/mendian',
    method: 'get',
  })
}
