<template>
  <div class="payCard">
    <div class="addBig" v-if="list.length <= 0" @click="setPay">
      <div class="circle">+</div>
      <b>{{ $t('c2c.d101') }}</b>
    </div>
    <div class="add" v-if="list.length > 0" @click="setPay">+ {{ $t('c2c.d101') }}</div>
    <div class="listBox">
      <div class="item" v-for="item in list" @click="updatePay(item)">
        <div class="img"><img :src="item.payImage" /></div>
        <div class="r">
          <b>{{ item.label }}</b>
          <div class="p">{{ item.accountName }}</div>
          <div class="p">{{ item.account }}</div>
        </div>
      </div>
    </div>

    <van-popup v-model:show="showPay" :style="{ height: '53%' }" round position="bottom">
      <div class="popupList">
        <div class="tit">{{ $t('c2c.d37') }}</div>
        <div class="list">
          <div :class="item.checked ? 'item cur' : 'item'" v-for="item in payList" @click="payTypeClick(item)">
            <div class="text">{{ item.label }}</div>
            <van-icon name="checked" />
          </div>
        </div>
        <div class="btn" @click="payOk">
          <span>{{ $t('password.Sure') }}</span>
        </div>
      </div>
    </van-popup>

    <van-dialog v-model:show="showPayType" :title="formTitle" :showCancelButton="showCance" :cancelButtonText="$t('new.d28')" :before-close="submitPay">
      <div class="c2cForm">
        <van-icon class="close" name="cross" @click="showPayType = false" />
        <div class="item">
          <div class="label">{{ $t('c2c.d31') }}</div>
          <div class="right" @click="showPay = true">
            <input type="text" v-model="payTypeLabel" readonly :placeholder="$t('home.pleasechoose')" />
            <van-icon class="down" name="play" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d137') }}</div>
          <div class="right">
            <input type="text" v-model="account" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('identity.d2') }}</div>
          <div class="right">
            <input type="text" v-model="accountName" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('new.d16') }}</div>
          <div class="right">
            <input type="password" autocomplete="off" v-model="payPassword" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import i18n from '@/i18n'
import { isRequired } from '@/utils/validators'
import { showConfirmDialog, showToast } from 'vant'
import { ref, getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_payCard'
})

const list = ref<any>([])
const showPay = ref<boolean>(false)
const showPayType = ref<boolean>(false)
const showCance = ref<boolean>(true)
const payList = ref<any>([])
const updatePayId = ref<string>('')
const paymentType = ref<any>('')
const payTypeLabel = ref<string>('')
const account = ref<string>('')
const accountName = ref<string>('')
const payPassword = ref<string>('')
const isUpdate = ref<boolean>(false)
const walletInfo = ref<any>({})
const formTitle = ref<string>('')
proxy.$api.walletInfo().then((res: any) => {
  if (res.code !== 200) return
  walletInfo.value = res.data
})
const tradeAccountList = () => {
  proxy.$api.tradeAccountList().then((res: any) => {
    if (res.code !== 200) return
    list.value = res.data
  })
}
tradeAccountList()

const getPayType = (type?: any) => {
  proxy.$api.walletPayTypes().then((res: any) => {
    if (res.code !== 200) return
    payList.value = res.data
    if (type) {
      for (let i = 0; i < payList.value.length; i++) {
        if (payList.value[i].value == type) {
          payList.value[i].checked = true
          break
        }
      }
    }
  })
}

const setPay = () => {
  formTitle.value = i18n.global.t('c2c.d101')
  showCance.value = false
  isUpdate.value = false
  showPayType.value = true
  account.value = ''
  accountName.value = ''
  payTypeLabel.value = ''
  getPayType()
}

const updatePay = (item: any) => {
  getPayType(item.type)
  if (!walletInfo.value.password) {
    showToast(i18n.global.t('c2c.d141'))
    return
  }
  formTitle.value = i18n.global.t('new.d17')
  showCance.value = true
  updatePayId.value = item.id
  paymentType.value = item.type
  account.value = item.account
  accountName.value = item.accountName
  payTypeLabel.value = item.label

  isUpdate.value = true
  showPayType.value = true
  payPassword.value = ''
}

const payTypeClick = (item: any) => {
  for (let i = 0; i < payList.value.length; i++) {
    if (item.value == payList.value[i].value) {
      payList.value[i].checked = true
    } else {
      payList.value[i].checked = false
    }
  }
}

const payOk = () => {
  paymentType.value = ''
  for (let i = 0; i < payList.value.length; i++) {
    if (payList.value[i].checked) {
      payTypeLabel.value = payList.value[i].label
      paymentType.value = payList.value[i].value
      break
    }
  }
  showPay.value = false
}

const submitPay = (action, done) => {
  // 点击了确定按钮
  if (action === 'confirm') {
    if (!isRequired(account.value)) {
      showToast(i18n.global.t('c2c.d142'))
      return
    }
    if (!isRequired(accountName.value)) {
      showToast(i18n.global.t('c2c.d143'))
      return
    }
    if (!isRequired(payPassword.value)) {
      showToast(i18n.global.t('c2c.d144'))
      return
    }
    showConfirmDialog({
      title: i18n.global.t('c2c.d145')
    }).then(() => {
      let json = {
        id: updatePayId.value,
        account: account.value,
        accountName: accountName.value,
        type: paymentType.value,
        payPassword: payPassword.value
      }

      if (isUpdate.value) {
        proxy.$api.tradeAccountModify(json).then((res: any) => {
          if (res.code !== 200) return
          showToast(i18n.global.t('forget.Successfullymodified'))
          showPayType.value = false
          tradeAccountList()
        })
      } else {
        proxy.$api.accountAdd(json).then((res: any) => {
          if (res.code !== 200) return
          showToast(i18n.global.t('new.d31'))
          showPayType.value = false
          tradeAccountList()
        })
      }
    })
  } else {
    if (!isRequired(payPassword.value)) {
      showToast(i18n.global.t('c2c.d144'))
      return
    }
    showConfirmDialog({
      title: i18n.global.t('new.d30')
    }).then(() => {
      let json = {
        id: updatePayId.value,
        payPassword: payPassword.value
      }
      proxy.$api.accountRemove(json).then((res: any) => {
        if (res.code !== 200) return
        showToast(i18n.global.t('new.d29'))
        showPayType.value = false
        tradeAccountList()
      })
    })
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
