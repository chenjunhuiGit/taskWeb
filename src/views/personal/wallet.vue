<template>
  <div class="wallet">
    <div class="income">
      <div class="total">
        <div class="t">{{ $t('wallet.d2') }}</div>
        <div class="num">
          <div class="span">
            <span>{{ info.wallet.totalAmount }}</span>
            USDT
          </div>
        </div>
      </div>
      <div class="pubBg type">
        <div class="br">
          <div class="item">
            <div class="t">{{ $t('withdraw.Availablebalance') }}（USDT）</div>
            <div class="num">{{ info.wallet.amount }}</div>
          </div>
          <div class="item">
            <div class="t">{{ $t('wallet.d1') }}（USDT）</div>
            <div class="num">{{ info.wallet.frozenAmount }}</div>
          </div>
        </div>
        <div class="br2">
          <router-link class="btn" to="/c2c">{{ $t('c2c.d20') }}</router-link>
          <router-link v-if="payTask" class="btn" to="/c2c">{{ $t('assets.type7') }}</router-link>
          <router-link v-else class="btn disabled" @click="showToast(i18n.global.t('c2c.d209'))" to="">{{ $t('assets.type7') }}</router-link>
        </div>
      </div>
    </div>
    <div class="ul">
      <div class="li" v-if="!info.wallet.bizType" @click="showTips">
        <div class="left">
          <span style="color: #9ba5b8">{{ $t('new.d33') }}</span>
        </div>
        <van-icon name="arrow" color="#9ba5b8" />
      </div>
      <router-link v-else class="li" to="/personal/transfer">
        <div class="left">
          <span>{{ $t('new.d33') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
      <router-link class="li" to="/personal/assets?type=18,19">
        <div class="left">
          <span>{{ $t('new.d46') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
    </div>
    <div class="ul">
      <div class="li" @click="showPop">
        <div class="left">
          <span>{{ $t('wallet.d3') }}</span>
        </div>
        <van-icon name="arrow" />
      </div>
      <router-link class="li" to="/personal/withdraw?type=1" v-if="payTask">
        <div class="left">
          <span>{{ $t('wallet.d4') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
      <router-link class="li disabled" @click="showToast(i18n.global.t('c2c.d209'))" to="" v-else>
        <div class="left">
          <span>{{ $t('wallet.d4') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
      <router-link class="li" to="/personal/wallet_address">
        <div class="left">
          <span>{{ $t('wallet.d5') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
    </div>
    <van-swipe :loop="false">
      <van-swipe-item>
        <div class="income2">
          <div class="tit">
            <span>{{ $t('wallet.d6') }}</span>
            <div class="num">{{ info.wallet.todayIncome }}</div>
          </div>
          <div class="list">
            <div class="item">
              <div class="p">{{ $t('wallet.d9') }}（USDT）</div>
              <div class="p2">{{ info.wallet.todayTaskIncome }}</div>
            </div>
            <div class="item">
              <div class="p">{{ $t('wallet.d10') }}（USDT）</div>
              <div class="p2">{{ info.wallet.todayTeamIncome }}</div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="income2">
          <div class="tit">
            <span>{{ $t('wallet.d7') }}</span>
            <div class="num">{{ info.wallet.weekIncome }}</div>
          </div>
          <div class="list">
            <div class="item">
              <div class="p">{{ $t('wallet.d9') }}（USDT）</div>
              <div class="p2">{{ info.wallet.weekTaskIncome }}</div>
            </div>
            <div class="item">
              <div class="p">{{ $t('wallet.d10') }}（USDT）</div>
              <div class="p2">{{ info.wallet.weekTeamIncome }}</div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="income2">
          <div class="tit">
            <span>{{ $t('wallet.d8') }}</span>
            <div class="num">{{ info.wallet.monthIncome }}</div>
          </div>
          <div class="list">
            <div class="item">
              <div class="p">{{ $t('wallet.d9') }}（USDT）</div>
              <div class="p2">{{ info.wallet.monthTaskIncome }}</div>
            </div>
            <div class="item">
              <div class="p">{{ $t('wallet.d10') }}（USDT）</div>
              <div class="p2">{{ info.wallet.monthTeamIncome }}</div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="ul">
      <router-link class="li" to="/personal/assets">
        <div class="left">
          <img src="@/assets/icon21.png" />
          <span>{{ $t('wallet.d11') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
      <router-link class="li" to="/personal/assets?type=6,10">
        <div class="left">
          <img src="@/assets/icon22.png" />
          <span>{{ $t('wallet.d12') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
      <router-link class="li" to="/personal/assets?type=2,7">
        <div class="left">
          <img src="@/assets/icon23.png" />
          <span>{{ $t('wallet.d13') }}</span>
        </div>
        <van-icon name="arrow" />
      </router-link>
    </div>

    <van-dialog v-model:show="show" :title="$t('c2c.d20')" :confirm-button-text="$t('personal.d8')" :before-close="sunbmit" show-cancel-button>
      <div class="dialog-lv">
        <div class="content">
          <div class="p">
            <div class="label">{{ $t('home.Uniquepaymentaddress') }}</div>
          </div>
          <div class="wallet">
            <div class="span">{{ payAddress0 }}</div>
            <div class="copy" @click="copy(payAddress0)">{{ $t('home.copy') }}</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('personal.d9') }}(USDT)</div>
            <div class="span"><input type="text" v-model="amount" @input="validateInput" :placeholder="$t('personal.Pleaseenter')" /></div>
          </div>
          <div class="p">
            <div class="label">TXID</div>
            <div class="span"><input type="text" v-model="txid" :placeholder="$t('personal.d16')" /></div>
          </div>
          <div class="p">
            <div class="label">{{ $t('personal.d18') }}</div>
            <van-uploader v-model="fileList" max-count="1" :after-read="afterRead" />
          </div>
          <div class="p"></div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { clipboard, maskEmail } from '@/utils/common'
import { showDialog, showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_wallet'
})

const copy = (key: any) => {
  clipboard(key) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}

const payAddress0 = ref<string>('')
const show = ref<boolean>(false)
const amount = ref<any>('')
const txid = ref<string>('')
const payTask = ref<boolean>(false)

const info = reactive<any>({
  user: {},
  wallet: {}
})
proxy.$api.userInfo().then((res: any) => {
  if (res.code !== 200) return
  payTask.value = Boolean(res.data.payTask)
  res.data.parentEmail = res.data.parentEmail ? maskEmail(res.data.parentEmail) : res.data.parentEmail
  info.user = res.data
})
proxy.$api.walletInfo2().then((res: any) => {
  if (res.code !== 200) return
  info.wallet = res.data
})

// 图片上传
const fileList = ref<any>([])
const afterRead = (file: any) => {
  file.status = 'uploading'
  proxy.$api.imgUpload({ type: 3, file: file.file }).then((res: any) => {
    if (res.code !== 200) {
      file.status = 'failed'
      return
    }
    file.url = res.data
    file.status = 'done'
  })
}

const showPop = () => {
  if (info.user.authStatus != 2) {
    showToast(i18n.global.t('personal.d15'))
    return
  }
  show.value = true
  proxy.$api.varGet('biz.trc.address').then((res: any) => {
    if (res.code !== 200) return
    payAddress0.value = res.data.value
  })
}

const sunbmit = (action, done) => {
  // 点击了确定按钮
  if (action === 'confirm') {
    if (!amount.value) {
      showToast(i18n.global.t('personal.d11'))
      return
    }
    if (!txid.value) {
      showToast(i18n.global.t('personal.d16'))
      return
    }
    let json = {
      amount: amount.value,
      trxId: txid.value,
      images: []
    }
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].url) json.images[i] = fileList.value[i].url
    }
    if (json.images.length == 0) {
      showToast(i18n.global.t('personal.d17'))
      return
    }
    proxy.$api.walletTopUp(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('personal.d10'))
      show.value = false
      info.wallet = res.data
    })
  } else {
    show.value = false
  }
}

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  // 如果输入值小于等于0，则将其清空或设为1（根据需求调整）
  if (!/^\d*\.?\d*$/.test(value) || parseFloat(value) <= 0) {
    amount.value = ''
  } else {
    amount.value = value
  }
}

const showTips = () => {
  showDialog({
    message: i18n.global.t('new.d50') + '\n\n' + i18n.global.t('new.d51'),
    messageAlign: 'left'
  }).then(() => {
    // on close
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
