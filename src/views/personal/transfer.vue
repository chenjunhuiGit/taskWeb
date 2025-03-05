<template>
  <div class="personal">
    <div class="pubBg">
      <div class="form">
        <div class="item t10">
          <div class="label">{{ $t('personal.Name') }}</div>
          <div class="span" v-if="isPass === true">{{ name }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d137') }}</div>
          <div class="right">
            <input type="text" v-model.lazy="formData.phone" @input="preventSpaces" @blur="phoneBlur" :placeholder="$t('personal.Pleaseenter')" />
            <van-icon name="passed" color="#006fff" v-if="isPass === true" />
          </div>
        </div>
        <div class="br" style="color: red" v-if="!isPass">{{ $t('new.d35') }}</div>
        <div class="item">
          <div class="label">{{ $t('assets.Amount') }}</div>
          <div class="right">
            <input type="text" v-model="formData.amount" @blur="checkNumber" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="br">{{ $t('withdraw.Availablebalance') }}：{{ info.amount }} USDT</div>
        <div class="br"><van-icon class="ic-help" name="question-o"  @click="showDialogTit"/>{{ $t('new.d56') }}：{{ commission }} USDT</div>
        <div class="item">
          <div class="label">{{ $t('new.d16') }}</div>
          <router-link v-if="!info.password" to="/personal/password?type=2">{{ $t('new.d21') }}</router-link>
          <div class="right" v-else>
            <input type="password" v-model.lazy="formData.password" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('c2c.d83') }}</div>
          <div class="right">
            <input type="text" v-model.lazy="formData.message" @input="preventSpaces" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="dis" class="pubBtn bigBtn disabled">{{ $t('password.Sure') }}</div>
    <div v-else class="pubBtn bigBtn" @click="submit">{{ $t('password.Sure') }}</div>
    <div class="tips2">{{ $t('new.d40') }}</div>
    <div class="tips2">{{ $t('new.d41') }}</div>
    <div class="tips2">{{ $t('new.d42') }}</div>
    <div class="tips2">{{ $t('new.d43') }}</div>
    <div class="tips2">{{ $t('new.d44') }}</div>
    <div class="tips2">{{ $t('new.d45') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
import { preventSpaces } from '@/utils/common'
import { isRequired } from '@/utils/validators'
import { showConfirmDialog, showToast } from 'vant'
import i18n from '@/i18n/index'
import router from '@/router'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_transfer'
})

const formData = ref<any>({})
const info = ref<any>({})
const isPass = ref<any>('1')
const name = ref<string>('')
const commission = ref<number>(0)
const origin = ref<any>('')

proxy.$api.walletInfo().then((res: any) => {
  if (res.code !== 200) return
  info.value = res.data
  origin.value = res.data.amount
})

const phoneBlur = () => {
  // 大于等于0的整数
  if (!/^\d+$/.test(formData.value.phone)) {
    formData.value.phone = ''
  }
  if (formData.value.phone) {
    proxy.$api.quaInspection({ phone: formData.value.phone, amount: formData.value.amount || 0 }).then((res: any) => {
      if (res.code !== 200) {
        isPass.value = '1'
        return
      }
      isPass.value = res.data.isPass
      name.value = res.data.name
      commission.value = res.data.commission
    })
  }
}

const checkNumber = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  if (!/^[1-9]\d*$/.test(value) || parseInt(value) < 10 || parseInt(value) > origin.value) {
    formData.value.amount = ''
    info.value.amount = origin.value
  } else {
    formData.value.amount = parseInt(value) || ''
    info.value.amount = (origin.value - formData.value.amount).toFixed(2)
    phoneBlur()
  }
}

const dis = ref<boolean>(false)
const submit = () => {
  if (isPass.value == false) return
  if (!isRequired(formData.value.phone || '')) {
    showToast(i18n.global.t('c2c.d142'))
  } else if (!isRequired(formData.value.amount || '')) {
    showToast(i18n.global.t('new.d47'))
  } else if (!isRequired(formData.value.password || '')) {
    showToast(i18n.global.t('new.d48'))
  } else {
    showConfirmDialog({
      message: i18n.global.t('new.d36', { phone: formData.value.phone })
    })
      .then(() => {
        dis.value = true
        proxy.$api.walletTransfer(formData.value).then((res: any) => {
          if (res.code !== 200) {
            dis.value = false
            return
          }
          showToast(i18n.global.t('new.d37'))
          router.push('/personal/wallet')
        })
      })
      .catch(() => {})
  }
}
const showDialogTit = () => {
  let text = i18n.global.t('c2c.d211')+'\n'+i18n.global.t('c2c.d212')+'\n'+i18n.global.t('c2c.d213')+'\n'+i18n.global.t('c2c.d214')+'\n'+i18n.global.t('c2c.d215')
  showConfirmDialog({
    title:i18n.global.t('c2c.d210'),
    showCancelButton:false,
    messageAlign:'left',
    closeOnClickOverlay:true,
    message:text,
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
