<script setup>

import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'


// 触发获取导航列表的action
 
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'
 
const categoryStore = useCategoryStore()
 
onMounted(() => categoryStore.getCategory())

</script>


<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 添加key 破坏复用机制  强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath"/> -->
    <RouterView />
    <LayoutFooter />
</template>



<!-- 这段代码的逻辑实现如下：

首先，通过 import 关键字导入了需要使用的组件和库，包括 LayoutNav、LayoutHeader、LayoutFooter 和 LayoutFixed 组件，以及 useCategoryStore 函数和 onMounted 函数。

然后，使用 useCategoryStore 函数创建了一个名为 categoryStore 的对象，该对象包含导航列表相关的状态和方法。

在组件挂载后，通过 onMounted 函数注册了一个回调函数，该回调函数会在组件挂载后执行。在回调函数中，调用了 categoryStore.getCategory() 方法，触发了获取导航列表的操作。

在模板部分，按照特定的顺序将组件进行渲染。首先渲染 LayoutFixed 组件，然后是 LayoutNav 组件，接着是 LayoutHeader 组件，然后使用 <RouterView /> 渲染动态路由视图，最后是 LayoutFooter 组件。

通过以上逻辑，实现了一个包含导航栏、头部、内容区域和底部的整体布局，同时在组件挂载后触发了获取导航列表的操作。 -->