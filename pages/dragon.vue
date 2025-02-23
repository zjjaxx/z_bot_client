<template>
  <div class="sector-page">
    <van-nav-bar title="板块龙头" fixed placeholder  />
    <!-- 板块网格布局 -->
    <van-grid :column-num="2" :gutter="12">
      <van-grid-item v-for="sector in dragonList" :key="sector.id">
        <div class="sector-card">
          <!-- 板块名称和涨跌 -->
          <div class="sector-header">
            <h3 class="name">{{ sector.block }}</h3>
            <span
              class="change-rate"
              :class="{
                'text-rise': sector.block_rate >= 0,
                'text-fall': sector.block_rate < 0,
              }"
            >
              {{ formatRate(sector.block_rate) }}
            </span>
          </div>

          <!-- 净流入金额 -->
          <div class="net-inflow">
            <span class="label">净流入</span>
            <span
              class="value"
              :class="{
                'text-rise': sector.input >= 0,
                'text-fall': sector.input < 0,
              }"
            >
              {{ sector.input }}亿元
            </span>
          </div>

          <!-- 领涨股信息 -->
          <div class="leader-stock">
            <div class="stock-name">领涨股:{{ sector.codeName }}</div>
            <div class="stock-info">
              <span class="price">现价:{{ sector.price }}</span>
              <span
                class="stock-change"
                :class="{
                  'text-rise': sector.pnl_rate >= 0,
                  'text-fall': sector.pnl_rate < 0,
                }"
              >
                涨幅:{{ formatRate(sector.pnl_rate) }}
              </span>
            </div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  tabbar: true, // 底部导航
});
const runtimeConfig = useRuntimeConfig();
const { data: response } = await useFetch("/bot_server/dragon_list", {
  baseURL: runtimeConfig.public.baseURL, // 使用 runtimeConfig 中的 baseURL
});
const dragonList = ref([]);
if (response.value.success) {
  dragonList.value = response.value.data;
}

// 格式化涨跌幅
const formatRate = (value) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};
</script>

<style scoped lang="scss">
:deep(.van-grid-item__content) {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
:deep(.van-nav-bar__placeholder){
    height: 46px;
}

.sector-card {
    width: 100%;
}

.sector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.name {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.change-rate {
  font-weight: bold;
  font-size: 14px;
}

.net-inflow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.label {
  color: #666;
}

.value {
  font-weight: bold;
}

.leader-stock {
  //   border-top: 1px solid #eee;
  padding-top: 8px;
}

.stock-name {
  font-size: 12px;
  color: #333;
  margin-bottom: 4px;
}

.stock-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.price {
  color: #333;
}

.text-rise {
  color: #ee0a24; /* Vant 红色 */
}

.text-fall {
  color: #07c160; /* Vant 绿色 */
}
</style>
