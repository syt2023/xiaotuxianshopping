<script setup>
// 引入所需的模块和库
import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout' // 导入结算信息和创建订单的API
import { useRouter } from 'vue-router' // 导入Vue Router
import { onMounted, ref } from 'vue' // 导入Vue的响应式引用和生命周期钩子
import { useCartStore } from '@/stores/cartStore' // 导入购物车存储库

// 创建购物车存储实例
const cartStore = useCartStore()
// 创建路由实例
const router = useRouter()

// 获取结算信息
const checkInfo = ref({}) // 订单对象
const curAddress = ref({}) // 默认地址
const getCheckInfo = async () => {
  const res = await getCheckInfoAPI() // 调用API获取结算信息
  checkInfo.value = res.result // 将结算信息赋值给订单对象
  // 适配默认地址
  // 从地址列表中筛选出isDefault === 0的地址
  const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
  curAddress.value = item // 将默认地址赋值给curAddress
}

// 在组件挂载后调用getCheckInfo获取结算信息
onMounted(() => getCheckInfo())

// 控制切换地址弹框的显示与隐藏
const showDialog = ref(false)

// 切换地址
const activeAddress = ref({})
const switchAddress = (item) => {
  activeAddress.value = item // 切换当前选中的地址
}
const confirm = () => {
  curAddress.value = activeAddress.value // 确认选择的地址为当前地址
  showDialog.value = false // 关闭切换地址弹框
  activeAddress.value = {} // 重置选中的地址
}

// 创建订单
const createOrder = async () => {
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map(item => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  }) // 调用API创建订单
  const orderId = res.result.id // 获取订单ID
  router.push({
    path: '/pay',
    query: {
      id: orderId
    }
  }) // 跳转到支付页面并传递订单ID作为查询参数
  // 更新购物车
  cartStore.updateNewList()
}
</script>

 
<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>¥{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>¥{{ i.totalPrice }}</td>
                <td>¥{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{ active: activeAddress.id === item.id }" @click="switchAddress(item)"
        v-for="item in checkInfo.userAddresses" :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
<!-- 添加地址 --></template>
 
<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;
 
  .wrapper {
    background: #fff;
    padding: 0 20px;
 
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
 
    .box-body {
      padding: 20px 0;
    }
  }
}
 
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
 
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
 
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
 
    >ul {
      flex: 1;
      padding: 20px;
 
      li {
        line-height: 30px;
 
        span {
          color: #999;
          margin-right: 5px;
 
          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
 
    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
 
  .action {
    width: 420px;
    text-align: center;
 
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
 
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
 
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
 
  .info {
    display: flex;
    text-align: left;
 
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
 
    .right {
      line-height: 24px;
 
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
 
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
 
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
 
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
 
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
 
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
 
  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}
 
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
 
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
 
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
 
      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}
 
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
 
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}
 
.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
 
  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;
 
    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }
 
    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>


<!-- 这段代码实现了一个订单结算页面的逻辑。以下是其实现逻辑的解释：

在 <script setup> 部分：

导入名为 getCheckInfoAPI 和 createOrderAPI 的函数，这些函数是用于与结算相关的 API 交互的工具函数。
导入名为 useRouter 的函数，用于获取 Vue Router 的实例，以便进行页面跳转。
导入名为 onMounted 和 ref 的函数，这些函数是 Vue 3 中的响应式工具函数。
导入名为 useCartStore 的函数，用于访问购物车数据的状态管理。
定义了一些响应式的变量和函数：

cartStore：使用 useCartStore 函数获取购物车数据的状态管理实例。
router：获取 Vue Router 的实例。
checkInfo：一个响应式的变量，用于存储从 getCheckInfoAPI 返回的订单对象数据。
curAddress：一个响应式的变量，用于存储当前选中的地址信息。
getCheckInfo：一个异步函数，用于获取结算信息。它通过调用 getCheckInfoAPI 函数来获取数据，并将数据存储在 checkInfo 和 curAddress 变量中。
showDialog：一个响应式的变量，用于控制切换地址对话框的显示和隐藏。
activeAddress：一个响应式的变量，用于存储选中的地址信息。
switchAddress：一个函数，用于切换选中的地址。它接收一个地址对象作为参数，并将该地址对象存储在 activeAddress 变量中。
confirm：一个函数，用于确认选中的地址。它将 activeAddress 变量的值赋给 curAddress 变量，并关闭切换地址对话框。
createOrder：一个异步函数，用于创建订单。它使用 createOrderAPI 函数向服务器发送创建订单的请求，并在成功后将页面重定向到支付页面。同时，它还调用 cartStore 实例的 updateNewList 方法来更新购物车数据。
在 <template> 部分：

页面展示了收货地址、商品信息、配送时间、支付方式和金额明细等内容。
使用 v-if 条件语句来根据 curAddress 变量的值显示不同的信息，如果地址不存在则显示相应的提示信息。
使用 v-for 指令根据 checkInfo.goods 数组生成商品列表。
使用 v-for 指令根据 checkInfo.userAddresses 数组生成地址列表。
点击 "切换地址" 按钮会打开切换地址对话框，并显示地址列表供用户选择。
"切换地址" 对话框具有取消和确定按钮，点击确定按钮会调用 confirm 函数切换地址。
点击 "提交订单" 按钮会调用 createOrder 函数创建订单并跳转到支付页面。
以上是这段代码的主要逻辑解释，它实现了一个订单结算页面，包括获取结算信息、选择收货地址、切换地址、创建订单等功能。具体的实现细节可能涉及到导入的 API 函数的具体实现和组件的样式定义等。 -->



<!-- 首先，我们导入了所需的模块和库，包括结算信息和创建订单的API、Vue Router以及Vue的响应式引用和生命周期钩子。

然后，我们创建了购物车存储实例和路由实例。

接下来，定义了一些变量和函数来处理获取结算信息、切换地址和创建订单的逻辑。

在组件挂载后，调用getCheckInfo函数来获取结算信息。这个函数会异步调用getCheckInfoAPI，并将返回的结果赋值给checkInfo.value，即订单对象。然后，它会从地址列表中找到isDefault === 0的地址，并将其赋值给curAddress.value，即默认地址。

紧接着，定义了一个响应式引用showDialog，用于控制切换地址弹框的显示与隐藏。

接下来，定义了一个响应式引用activeAddress，用于保存当前选中的地址。switchAddress函数用于切换选中的地址，它会将传入的item赋值给activeAddress.value。

confirm函数会将选中的地址赋值给curAddress.value，关闭切换地址弹框，然后重置选中的地址。

最后，定义了一个异步函数createOrder，用于创建订单。它会调用createOrderAPI，并传入一些参数，包括配送时间类型、支付类型、支付渠道、买家留言以及商品信息和地址ID。创建订单成功后，获取订单ID，并通过路由跳转到支付页面，同时将订单ID作为查询参数传递。最后，调用cartStore的updateNewList方法来更新购物车。 -->