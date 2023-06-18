
<script setup>
import { getLikeListAPI } from '@/apis/user' // 从用户API中导入获取喜欢列表的函数
import { onMounted, ref } from 'vue' // 导入Vue中的onMounted和ref函数
import GoodsItem from '@/views/Home/components/GoodsItem.vue' // 导入商品项组件

import { useUserStore } from '@/stores/userStore' // 导入用户存储对象的函数
const userStore = useUserStore() // 使用 useUserStore 函数获取用户存储对象

const likeList = ref([]) // 创建一个响应式对象来保存喜欢的商品列表

const getLikeList = async () => {
  const res = await getLikeListAPI({ limit: 4 }) // 调用获取喜欢列表的API函数，并传入参数限制为最多 4 个
  likeList.value = res.result // 将获取到的喜欢列表数据保存到 likeList 中
}

onMounted(() => getLikeList()) // 在组件挂载后调用获取喜欢列表的函数
</script>

<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img :src="userStore.userInfo?.avatar" />   <!-- 显示用户头像 -->
      </div>
      <h4>{{ userStore.userInfo?.account }}</h4>   <!-- 显示用户名称 -->
    </div>
    <div class="item">
      <a href="javascript:;">
        <span class="iconfont icon-hy"></span>
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <div class="like-container">
    <div class="home-panel">
      <div class="header">
        <h4 data-v-bcb266e0="">猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="good in likeList" :key="good.id" :goods="good" />   <!-- 遍历渲染喜欢的商品列表 -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-overview {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;
  display: flex;
 
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
 
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;
 
      img {
        width: 100%;
        height: 100%;
      }
    }
 
    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
 
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
 
    &:first-child {
      border-right: 1px solid #f4f4f4;
    }
 
    a {
      color: white;
      font-size: 16px;
      text-align: center;
 
      .iconfont {
        font-size: 32px;
      }
 
      p {
        line-height: 32px;
      }
    }
  }
}
 
.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}
 
.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;
 
  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
 
    h4 {
      font-size: 22px;
      font-weight: 400;
    }
 
  }
 
  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>





<!-- 这段代码实现了一个包含用户信息、功能项和喜欢的商品列表的首页概览部分。下面是代码的实现逻辑：

在<script setup>标签中，首先导入了getLikeListAPI函数，该函数用于从用户API中获取喜欢列表的数据。然后导入了Vue中的onMounted和ref函数，以及商品项组件GoodsItem。

使用useUserStore函数获取用户存储对象userStore，该对象用于保存用户信息。

创建了一个响应式对象likeList，用于保存喜欢的商品列表数据。

定义了getLikeList异步函数，该函数通过调用getLikeListAPI函数获取喜欢列表的数据，其中传入参数{ limit: 4 }用于限制最多获取4个商品。

使用onMounted钩子，在组件挂载后调用getLikeList函数，即在组件加载后获取喜欢的商品列表数据。

在<template>标签中，展示了一个首页概览部分。首先显示了用户信息，包括用户头像和用户名称，其中用户头像的src属性绑定了userStore.userInfo?.avatar，用于动态显示用户头像。

接下来显示了一些功能项，如会员中心、安全设置和地址管理，每个功能项都有相应的图标和文本描述。

然后展示了一个喜欢的商品列表部分。该部分包含一个名为home-panel的面板，面板顶部有一个标题为"猜你喜欢"的标签。

在商品列表部分，使用v-for指令遍历likeList数组中的商品项，并将每个商品项传递给GoodsItem组件进行渲染。每个商品项通过:key绑定了商品的唯一标识符，:goods绑定了商品数据。

最后，使用<style>标签定义了一些样式，包括概览部分的背景图、用户信息和功能项的样式，以及喜欢的商品列表部分的样式。

综上所述，这段代码实现了一个首页概览部分，展示了用户信息、功能项和喜欢的商品列表，并且在组件加载后异步获取喜欢的商品列表数据，并动态渲染到页面中。 -->