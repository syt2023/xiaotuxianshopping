<template>
  <footer class="app_footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>
 
<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
 
  .contact {
    background: #fff;
 
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }
 
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
 
      &:first-child {
        padding-left: 0;
      }
 
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
 
    dt {
      line-height: 1;
      font-size: 18px;
    }
 
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
 
      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }
 
      &:hover {
        .iconfont {
          color: $xtxColor;
        }
      }
 
      &:last-child {
        margin-right: 0;
      }
    }
 
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }
 
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
 
      span {
        display: block;
      }
 
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $xtxColor;
      }
    }
 
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
 
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
 
  .extra {
    background-color: #333;
  }
 
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
 
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
 
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
 
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
 
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
 
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
 
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
 
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>


<!-- footer 元素具有类名 app_footer，用于设置样式。

contact 区域用于联系方式的展示，包含一个具有类名 container 的容器。

dl 元素表示每个联系方式的部分。

dt 元素表示标题，例如 "客户服务"、"关"注我们"、"下载APP"、"服务热线"。

dd 元素表示具体的联系方式，例如 "在线客服"、"问题反馈"、"公众号"、"微博"、"二维码图片"、"立马下载APP"、"下载页面"、"服务热线号码"等。

extra 区域用于展示其他信息，也包含一个具有类名 container 的容器。

slogan 是一个包含多个标语的区域，每个标语都是一个链接，包括一个图标和相应的文字描述。

copyright 是版权信息的部分，包含一个或多个链接，例如 "关于我们"、"帮助中心"、"售后服务"、"配送与验收"、"商务合作"、"搜索推荐"、"友情链接"。最后还有一个 p 元素，用于显示版权声明。

该代码片段展示了一个典型的网页底部结构，包含联系方式、关注我们、下载APP、服务热线等部分，并提供了其他相关链接和版权信息。 -->