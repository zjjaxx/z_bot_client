<template>
  <div class="stock-page">
    <van-nav-bar title="每日策略" fixed placeholder />
    <van-list class="strategy-list" v-if="middleList.length">
      <div
        v-for="(item, index) in middleList"
        :key="index"
        class="strategy-card"
      >
        <div class="card-header">
          <div>
            <h3 class="stock-code">股票代码:{{ item.stock_id }}</h3>
            <p class="operate-time">操作时间:{{ item.strateOperateTime }}</p>
          </div>
          <div class="tag-group">
            <van-tag :color="getActionColor(item.action)" class="action-tag">
              {{ item.action }}
            </van-tag>
            <van-tag
              :color="getPositionColor(item.strateOperate)"
              plain
              class="position-tag"
            >
              {{ formatStrateOperate(item.strateOperate) }}
            </van-tag>
          </div>
        </div>

        <div class="card-body">
          <p class="strategy-name">策略名称：{{ item.strateName }}</p>
          <p class="create-time">{{ item.created }}</p>
        </div>

        <div class="card-footer">
          <van-button
            :style="{marginRight:'10px'}"
            size="small"
            class="detail-btn"
            type="primary"
            round
            @click="copyText(item.stock_id)"
          >
            复制代码
          </van-button>
          <van-button
            size="small"
            class="detail-btn"
            type="danger"
            round
            @click="showDetail(item.strateDesc)"
          >
            查看详情
          </van-button>
        </div>
      </div>
    </van-list>
    <div v-else class="empty"></div>
    <van-dialog v-model:show="strategyShow" title="策略详情">
      <div class="dialog-content" v-html="strateDesc"></div>
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  getActionColor,
  formatStrateOperate,
  getPositionColor,
  copyText,
} from "@/utils/index";
definePageMeta({
  tabbar: true, // 底部导航
});

const runtimeConfig = useRuntimeConfig();
const { data: response } = await useFetch("/bot_server/strategy_middle_list", {
  baseURL: runtimeConfig.public.baseURL, // 使用 runtimeConfig 中的 baseURL
});
const middleList = ref([]);
if (response.value.success) {
  middleList.value = response.value.data;
}
const strategyShow = ref(false);
const strateDesc = ref("");
const showDetail = (desc: string) => {
  strategyShow.value = true;
  strateDesc.value = desc;
};
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar__placeholder) {
  height: 46px;
}
.stock-page {
  padding: 12px;
  background: #f7f8fa;
  height: 100vh;

  .strategy-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }

  .strategy-card:hover {
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .stock-code {
    margin: 0;
    color: #2d3436;
    font-size: 16px;
    font-weight: 600;
  }

  .operate-time {
    margin: 4px 0 0;
    color: #95a5a6;
    font-size: 12px;
  }

  .tag-group {
    display: flex;
    gap: 8px;
  }

  .action-tag {
    color: white !important;
    font-weight: bold;
    border-radius: 4px;
  }

  .position-tag {
    border-radius: 4px;
  }

  .card-body {
    margin: 12px 0;
  }

  .strategy-name {
    margin: 0;
    color: #2d3436;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.4;
  }

  .create-time {
    margin: 8px 0 0;
    color: #95a5a6;
    font-size: 12px;
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
  }

  .detail-btn {
    width: 100px;
    font-size: 13px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
.dialog-content {
  padding: 20px;
}
.empty {
  margin-top: 300px;
  width: 80px;
  height: 80px;
  background-image: url("@/assets/imgs/empty.png");
  background-size: 100% 100%;
}
</style>
