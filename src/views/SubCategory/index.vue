<script setup>

import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue'

// 获取面包屑导航数据
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(() => getCategoryData())
 
// 获取基础列表数据渲染
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.result.items
}
onMounted(() => getGoodList())
 
 
// tab切换回调
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}
 
// 加载更多
const disabled = ref(false)
const load = async () => {
  console.log('加载更多数据咯')
  // 获取下一页的数据
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.result.items]
  // 加载完毕 停止监听
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}
 
</script>
 
<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
 
</template>
 
 
 
<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}
 
.sub-container {
  padding: 20px 10px;
  background-color: #fff;
 
  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }
 
  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;
 
    img {
      width: 160px;
      height: 160px;
    }
 
    p {
      padding-top: 10px;
    }
 
    .name {
      font-size: 16px;
    }
 
    .desc {
      color: #999;
      height: 29px;
    }
 
    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
 
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
 
 
}
</style>




<!-- 在<script setup>块中导入所需的模块和组件，并创建了一些响应式变量和函数。

categoryData是一个响应式变量，用于存储面包屑导航数据。在getCategoryData函数中，通过调用getCategoryFilterAPI接口获取面包屑导航数据，并将结果赋值给categoryData.value。在组件挂载后（onMounted钩子），调用getCategoryData函数。

goodList是一个响应式变量，用于存储商品列表数据。reqData是一个包含分类ID、页码、页大小和排序字段的对象，作为获取商品列表数据的请求参数。在getGoodList函数中，通过调用getSubCategoryAPI接口并传入reqData.value作为参数，获取商品列表数据，并将结果中的商品列表赋值给goodList.value。在组件挂载后（onMounted钩子），调用getGoodList函数。

tabChange是一个回调函数，用于处理标签页切换事件。当标签页切换时，将页码重置为1，并调用getGoodList函数重新获取商品列表数据。

disabled是一个响应式变量，表示是否禁用加载更多功能。在load函数中，当加载更多数据时，将页码加1，并调用getSubCategoryAPI接口获取下一页的商品列表数据。将新获取的商品列表数据追加到goodList.value中。如果新获取的数据为空，即没有更多数据可加载，将disabled.value设置为true，停止监听加载更多事件。

在模板部分，展示了一个面包屑导航和商品列表。面包屑导航使用了el-breadcrumb组件，通过绑定动态数据实现路径跳转和面包屑显示。商品列表通过v-for指令遍历goodList数组，在每次遍历中渲染一个商品项组件GoodsItem。

el-tabs组件用于实现标签页切换功能，通过绑定reqData.sortField实现与标签页的双向绑定，当切换标签页时，会触发tabChange函数。

v-infinite-scroll指令用于实现无限滚动加载更多功能。当滚动到容器底部时，会触发load函数，从而加载下一页的商品数据。 -->