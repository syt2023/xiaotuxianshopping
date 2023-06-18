<script setup>

import LayoutHeaderUl from './LayoutHeaderUl.vue'
// vueUse
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
 
 
</script>
<!-- 这段代码是一个 Vue 组件的 <script> 部分的设置代码。

引入了名为 LayoutHeaderUl 的组件，它可能是一个导航栏组件。

使用了 vueUse 插件，具体是通过导入 useScroll 函数从 @vueuse/core 库中。该函数用于监听页面滚动。

useScroll(window) 会返回一个对象，其中的 y 属性表示页面垂直滚动的距离。 -->
 
<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
 
      <LayoutHeaderUl />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>
 
 
<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;
 
  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
 
  .container {
    display: flex;
    align-items: center;
  }
 
  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }
 
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;
 
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
 
      &:hover {
        color: $xtxColor;
      }
    }
  }
}
</style>





<!-- 这段代码是该组件的模板部分，用于渲染页面的 HTML 结构。

最外层的 div 元素具有类名 app-header-sticky，并使用动态类绑定 :class="{ show: y > 78 }"。这意味着当 y 大于 78 时，会添加 show 类，从而显示该元素。

在 div 元素内部，有一个具有类名 container 的容器。

RouterLink 组件被用作网站的标志性 logo，并通过 to="/" 设置导航到根目录。

在导航区域下方，使用了 LayoutHeaderUl 组件来展示更多导航内容，可能是一个具有多个导航链接的组件。

div 元素内的 .right 类包含两个使用 RouterLink 组件的链接，分别是 "品牌" 和 "专题"。

该代码片段展示了一个顶部固定导航栏的组件，通过监听页面滚动距离来实现导航栏的显示与隐藏效果，并通过组合使用 RouterLink 组件和自定义的导航组件来展示导航链接。 -->