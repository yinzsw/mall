import {request} from "network/requests";

export function getHomeMutlidata() {
  return request({
    url:'/home/multidata'
  })
}
