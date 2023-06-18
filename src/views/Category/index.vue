<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue' // 导入商品项组件
import { useBanner } from './composables/useBanner' // 导入轮播图相关的自定义逻辑
import { useCategory } from './composables/useCategory' // 导入分类相关的自定义逻辑

const { bannerList } = useBanner() // 使用 useBanner 自定义逻辑获取轮播图数据
const { categoryData } = useCategory() // 使用 useCategory 自定义逻辑获取分类数据
</script>
 
<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">"> <!-- 使用">"作为面包屑的分隔符 -->
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> <!-- 首页面包屑项，点击跳转到路径'/' -->
                    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item> <!-- 动态显示当前分类名称的面包屑项 -->
                </el-breadcrumb>
            </div>
            <!-- 轮播图 -->
            <div class="home-banner">
                <el-carousel height="500px"> <!-- 高度设置为500px的轮播图组件 -->
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt=""> <!-- 显示轮播图中的图片 -->
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="sub-list">
                <h3>全部分类</h3> <!-- 标题：全部分类 -->
                <ul>
                    <li v-for="i in categoryData.children" :key="i.id">
                        <RouterLink :to="`/category/sub/${i.id}`"> <!-- 使用RouterLink组件进行路由跳转 -->
                            <img :src="i.picture" /> <!-- 显示分类的图片 -->
                            <p>{{ i.name }}</p> <!-- 显示分类的名称 -->
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3> <!-- 根据分类显示分类名称 -->
                </div>
                <div class="body">
                    <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" /> <!-- 显示该分类下的商品列表 -->
                </div>
            </div>
        </div>
    </div>
</template>

 
 
<style scoped lang="scss">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }
}

.home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;


    img {
        width: 100%;
        height: 500px;
    }
}
</style>






<!-- // 在 script setup从 '../Home/components/GoodsItem.vue' 文件导入 GoodsItem 组件。该组件用于显示单个商品项。
// 从各自的文件中导入 useBanner 和 useCategory 组合函数。这些组合函数提供了获取轮播图数据和分类数据的逻辑。
// 在 <template> 部分：

// 代码定义了一个顶级容器，类名为 "top-category"，以及另一个容器，类名为 "container m-top-20"，用于布局目的。
// 面包屑部分使用 Element Plus 的 el-breadcrumb 组件显示面包屑导航。面包屑项根据当前分类动态生成，其中包括指向首页和当前分类名称的链接。
// 轮播图部分使用 Element Plus 的 el-carousel 组件显示一个轮播图。轮播项使用 v-for 指令根据从 useBanner 组合函数获取的 bannerList 数据生成。
// 子分类列表部分显示一个分类列表。每个分类通过 <li> 元素生成，使用 v-for 指令根据 categoryData.children 数组动态生成。分类的图片、名称以及指向子分类页面的链接使用 Vue Router 的 RouterLink 组件显示。
// 商品列表部分显示子分类及其关联商品的列表。每个子分类由一个带有类名 "ref-goods" 的容器表示。使用 v-for 指令基于 categoryData.children 数组，在容器内部使用 GoodsItem 组件渲染关联的商品。
// 该逻辑涉及使用自定义组合函数 useBanner 和 useCategory 获取轮播图和分类部分的数据。然后，使用获取的数据填充模板中的相关信息，并渲染适当的 UI 组件。 -->