import {request} from "./requests";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
