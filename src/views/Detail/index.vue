<script setup>
// 引入所需的模块和组件
import DetailHot from './components/DetailHot.vue' // 导入详情热点组件
import { getDetail } from '@/apis/detail' // 导入获取详情信息的API
import { onMounted, ref } from 'vue' // 导入Vue的响应式引用和生命周期钩子
import { useRoute } from 'vue-router' // 导入Vue Router的useRoute函数
import { ElMessage } from 'element-plus' // 导入Element Plus的消息组件
import { useCartStore } from '@/stores/cartStore' // 导入购物车存储库

// 创建购物车存储实例
const cartStore = useCartStore()
// 创建响应式引用变量goods，用于保存详情信息
const goods = ref({})
// 创建路由实例
const route = useRoute()

// 获取商品详情信息
const getGoods = async () => {
  const res = await getDetail(route.params.id) // 调用API获取详情信息
  goods.value = res.result // 将结果赋值给goods变量
}
onMounted(() => getGoods()) // 在组件挂载后调用getGoods函数获取商品详情信息

// 当sku规格被操作时
let skuObj = {}
const skuChange = (sku) => {
  console.log(sku)
  skuObj = sku // 将选中的sku赋值给skuObj变量
}

// count
const count = ref(1) // 创建响应式引用变量count，并初始化为1
const countChange = (count) => {
  console.log(count)
}

// 添加购物车
const addCart = () => {
  if (skuObj.skuId) {
    console.log(skuObj, cartStore.addCart)
    // 规格已经选择，触发addCart方法
    cartStore.addCart({
      id: goods.value.id,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: skuObj.skuId,
      attrsText: skuObj.specsText,
      selected: true
    })
  } else {
    // 规格没有选择，提示用户选择规格
    ElMessage.warning('请选择规格')
  }
}
</script>



<!-- 导入所需的模块和组件。
创建Vue组件中的响应式引用和路由实例。
使用API获取商品详情信息，并将结果保存在goods变量中。
当sku规格被操作时，将选中的sku赋值给skuObj变量。
创建响应式引用变量count，并提供一个函数countChange用于修改count的值。
实现添加购物车的逻辑，判断是否选择了规格，如果选择了则调用cartStore的addCart方法将商品添加到购物车中，如果未选择则通过Element Plus的消息组件提示用户选择规格。
请注意，这段代码中的一些变量和函数可能依赖于其他文件中的定义和实现，例如./components/DetailHot.vue和@/apis/detail，因此需要确保在正确的环境中运行。此外，此代码片段可能还需要Vue和Vue Router等库的支持才能正常运行。 -->

 
<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- 
                错误原因：goods一开始{}  {}.categories -> undefined  -> undefined[1]
                1. 可选链的语法?. 
                2. v-if手动控制渲染时机 保证只有数据存在才渲染
            -->
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[1].id}` }">{{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories[0].id}` }">{{
            goods.categories[0].name
          }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>抓绒保暖，毛毛虫子儿童运动鞋</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <XtxImageView :image-list="goods.mainPictures" />
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> {{ goods.salesCount }}+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goods.brand.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{ goods.name }} </p>
              <p class="g-desc">{{ goods.desc }} </p>
              <p class="g-price">
                <span>{{ goods.oldPrice }}</span>
                <span> {{ goods.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="goods" @change="skuChange" />
              <!-- 数据组件 -->
              <el-input-number v-model="count" @change="countChange" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" :src="img" :key="img" alt="">
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24小时 -->
              <DetailHot :hot-type="1" />
              <!-- 周 -->
              <DetailHot :hot-type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 
<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>



<!-- 首先，我们引入了所需的模块和组件，包括详情热点组件、获取详情信息的API、Vue的响应式引用和生命周期钩子、Vue Router的useRoute函数以及Element Plus的消息组件。

接下来，创建了购物车存储实例和响应式引用变量goods，用于保存详情信息。创建了路由实例。

然后，定义了一个异步函数getGoods，用于获取商品详情信息。它会调用getDetailAPI，并传入路由参数route.params.id来获取对应的商品详情。获取到的结果会赋值给goods.value。

在组件挂载后，通过onMounted钩子调用getGoods函数来获取商品详情信息。

在sku规格被操作时，定义了一个变量skuObj用于保存选中的sku规格。skuChange函数接收选中的sku作为参数，并将其赋值给skuObj。

创建了响应式引用变量count，并初始化为1。countChange函数接收一个count参数，但目前没有具体实现。

最后，定义了一个addCart函数，用于添加商品到购物车。如果已经选择了规格（即skuObj.skuId存在），则调用cartStore的addCart方法，传入商品的相关信息，包括商品ID、名称、图片、价格、数量、skuID、规格文本和选中状态。如果规格没有选择，则通过Element Plus的消息组件提示用户选择规格 -->