<script setup>

import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
 
</script>
 
<template>
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i><em>{{ cartStore.cartList.length }}</em>
    </a>
    <div class="layer">
      <div class="list">
        <!-- 遍历购物车列表 -->
        <div class="item" v-for="i in cartStore.cartList" :key="i">
          <RouterLink to="">
            <!-- 商品图片 -->
            <img :src="i.picture" alt="" />
            <div class="center">
              <!-- 商品名称 -->
              <p class="name ellipsis-2">{{ i.name }}</p>
              <!-- 商品属性 -->
              <p class="attr ellipsis">{{ i.attrsText }}</p>
            </div>
            <div class="right">
              <!-- 商品价格 -->
              <p class="price">¥{{ i.price }}</p>
              <!-- 商品数量 -->
              <p class="count">x{{ i.count }}</p>
            </div>
          </RouterLink>
          <!-- 删除商品按钮 -->
          <i class="iconfont icon-close-new" @click="cartStore.delCart(i.skuId)"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <!-- 购物车总件数 -->
          <p>共 {{ cartStore.allCount }} 件商品</p>
          <!-- 购物车总价 -->
          <p>¥ {{ cartStore.allPrice.toFixed(2) }} </p>
        </div>
        <!-- 去购物车结算按钮 -->
        <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
      </div>
    </div>
  </div>
</template>


 
<style scoped lang="scss">
.cart {
  width: 50px;
  position: relative;
  z-index: 600;
 
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
 
    .icon-cart {
      font-size: 22px;
    }
 
    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }
 
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }
 
  .layer {
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;
 
    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }
 
    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;
 
      .total {
        padding-left: 10px;
        color: #999;
 
        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }
 
  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;
 
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
 
    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }
 
    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }
 
    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
 
    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;
 
      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
      }
 
      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }
 
      a {
        display: flex;
        align-items: center;
 
        img {
          height: 80px;
          width: 80px;
        }
 
        .center {
          padding: 0 10px;
          width: 200px;
 
          .name {
            font-size: 16px;
          }
 
          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
 
        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;
 
          .price {
            font-size: 16px;
            color: $priceColor;
          }
 
          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>


<!-- 在最外层的div元素中，使用了cart类名来设置样式。

a元素展示了购物车图标和购物车中商品的数量，使用了icon-cart图标和em标签来显示数量。

div元素中的layer类包含了购物车列表和底部结算区域。

在购物车列表中，使用了v-for指令遍历cartStore.cartList数组，并为每个商品项生成一个div元素。商品项的属性包括图片、名称、属性、价格和数量，其中使用了RouterLink组件包裹商品图片和名称，点击可以跳转到商品详情页面。删除商品按钮使用了icon-close-new图标，并绑定了点击事件@click="cartStore.delCart(i.skuId)"来从购物车中删除该商品。

在底部结算区域，展示了购物车总件数和总价，并使用了el-button组件作为去购物车结算按钮，点击后跳转到/cartlist页面。

这段代码主要用于展示购物车组件的结构和内容，并通过数据绑定和循环指令来动态展示购物车中的商品列表和总计信息 -->