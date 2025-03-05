<template>
  <div class="shopCenter">
    <div class="income">
      <div class="total">
        <div class="t">
          <img src="@/assets/icon18.png" alt="" />
          <span>{{ $t('c2c.d174') }}</span>
        </div>
        <div class="br2">
          <div class="item">
            <div class="t">{{ $t('c2c.d175') }}（USDT）</div>
            <div class="num">{{ info.buyAmount }}</div>
          </div>
          <div class="item">
            <div class="t">{{ $t('c2c.d176') }}（USDT）</div>
            <div class="num">{{ info.sellAmount }}</div>
          </div>
        </div>
      </div>
      <div class="pubBg type">
        <div class="br">
          <div class="t">{{ $t('c2c.d177') }}（{{ $t('c2c.d180') }}）</div>
          <div class="num">{{ info.ordersCompleted }}</div>
        </div>
        <div class="br2">
          <div class="item">
            <div class="t">{{ $t('c2c.d178') }}（{{ $t('c2c.d180') }}）</div>
            <div class="num">{{ info.buyCompleteCount }}</div>
          </div>
          <div class="item">
            <div class="t">{{ $t('c2c.d179') }}（{{ $t('c2c.d180') }}）</div>
            <div class="num">{{ info.sellCompleteCount }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pubBg ul newBox">
      <div class="br3 li" >
        <div class="left">
          <img src="@/assets/icon19.png" />
          <span>{{ $t('c2c.d204') }}</span>
        </div>
        <router-link to="/c2c/shop_month?type=1">{{ $t('c2c.d182') }}</router-link>
      </div>
      <div class="br3 li">
        <div class="left">
          <img src="@/assets/icon19.png" />
          <span>{{ $t('c2c.d205') }}</span>
        </div>
        <router-link to="/c2c/sell_month?type=2">{{ $t('c2c.d182') }}</router-link>
      </div>
    </div>
    <div class="pubBg ul">
      <router-link to="/c2c/shop_release" class="li">
        <div class="label">{{ $t('router.shop_release') }}</div>
        <span>{{ $t('c2c.d183') }} <van-icon name="arrow" /></span>
      </router-link>
      <router-link to="/c2c/shop_trading" class="li">
        <div class="label">{{ $t('router.shop_trading') }}</div>
        <span><van-icon name="arrow" /></span>
      </router-link>
      <router-link to="/c2c/shop_order" class="li">
        <div class="label">{{ $t('router.shop_order') }}</div>
        <span><van-icon name="arrow" /></span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'c2c_shop'
})

const info = ref<any>({})
proxy.$api.monthlyOverview().then((res: any) => {
  if (res.code !== 200) return
  info.value = res.data
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
