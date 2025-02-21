<template>
  <div>
    <!-- 页面内容 -->
    <main class="page-content">
      <slot />
    </main>
    <!-- 底部导航栏（仅非登录页显示） -->
    <van-tabbar placeholder route v-if="route.meta.tabbar" active-color="#ee0a24">
      <van-tabbar-item replace to="/dragon" icon="fire-o"
        >板块龙头</van-tabbar-item
      >
      <van-tabbar-item replace to="/" icon="balance-o"
        >稳健投资</van-tabbar-item
      >
      <van-tabbar-item replace to="/seek" icon="points"
        >稳中求进</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
console.log("route", route);
</script>
