import httpInstance from "@/utils/http"
 
export function getCategoryAPI () {
  return httpInstance({
    url: '/home/category/head'    //全部分类
  })
}