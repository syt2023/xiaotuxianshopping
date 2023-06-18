<script setup>

import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'

</script>
<!-- 在这段代码中，使用了<script setup>，这是Vue 3中的一个语法糖，用于简化组件的设置部分。

首先，通过import语句引入了所需的组件文件，包括HomeCategory、HomeBanner、HomeNew、HomeHot和HomeProduct。

接下来，是模板部分： -->

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>
<!-- 在模板中，使用了<div>元素包裹了HomeCategory和HomeBanner组件，这表示这两个组件在布局上是处于同一级别，并且位于一个名为container的类中。

然后，直接调用了HomeNew、HomeHot和HomeProduct组件，这意味着它们会在模板中渲染出来。

总结起来，这段代码的作用是在模板中渲染一组组件，包括HomeCategory、HomeBanner、HomeNew、HomeHot和HomeProduct。其中，HomeCategory和HomeBanner被包裹在一个<div>中，其他组件则直接调用。 -->