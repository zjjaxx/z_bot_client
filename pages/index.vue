<template>
  <div class="stock-page">
    <van-nav-bar title="每日策略" fixed placeholder />
    <van-list>
      <van-cell
        v-for="(item, index) in strategyList"
        :key="index"
        :title="item.stockCode"
        :label="item.time"
      >
        <template #value>
          <div class="strategy-info">
            <div class="header">
              <van-tag :color="getActionColor(item.action)" class="action-tag">
                {{ item.action }}
              </van-tag>
              <van-tag :color="getPositionColor(item.position)" plain>
                {{ item.position }}
              </van-tag>
            </div>
            <div class="strategy-name">{{ item.strategyName }}</div>
            <div class="description">{{ item.description }}</div>
            <van-button size="mini" class="detail-btn"> 查看详情 </van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  tabbar: true, // 底部导航
})
const getActionColor = (action) => {
  const colors = {
    买入: "#07c160",
    卖出: "#ee0a24",
    持有: "#ff976a",
    观望: "#969799",
  };
  return colors[action] || "#969799";
};

const getPositionColor = (position) => {
  const colors = {
    轻仓: "#07c160",
    中等仓位: "#ff976a",
    重仓: "#ee0a24",
  };
  return colors[position] || "#969799";
};
const strategyList = ref([
  {
    stockCode: "SH600519",
    strategyName: "白酒龙头回调策略",
    action: "买入",
    time: "2023-07-20 09:30:00",
    description: "二季度业绩超预期，MACD金叉形成",
    position: "中等仓位",
  },
  {
    stockCode: "SZ300750",
    strategyName: "新能源超跌反弹",
    action: "观望",
    time: "2023-07-20 10:15:00",
    description: "板块整体回调，等待企稳信号",
    position: "轻仓",
  },
  {
    stockCode: "HK00700",
    strategyName: "平台经济政策利好",
    action: "持有",
    time: "2023-07-20 11:00:00",
    description: "政策支持力度加大，长期看好",
    position: "重仓",
  },
]);
</script>

<style lang="scss" scoped>
.stock-page {
  padding: 12px;

  .strategy-info {
    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;

      .action-tag {
        font-size: 14px;
        padding: 2px 6px;
      }
    }

    .strategy-name {
      font-weight: 500;
      color: #323233;
      margin-bottom: 4px;
    }

    .description {
      font-size: 12px;
      color: #969799;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .detail-btn {
      width: 80px;
      font-size: 12px;
    }
  }

  ::v-deep .van-cell__value {
    flex: 2.5;
  }
}
</style>
