<template>
  <div class="userInfo">
    <van-form>
      <van-cell-group inset>
        <van-field name="uploader" :label="$t('userCenter.c06')" class="userImage">
          <template #input>
            <van-uploader v-model="fileList" :afterRead="toUpdateImg" max-count="1" />
          </template>
        </van-field>
        <van-field v-model="userInfo.firstName" :label="$t('personal.Name')" input-align="right" is-link readonly @click="toshowDialog(1)" />
        <van-field v-model="userInfo.lastName" :label="$t('personal.Lastname')" input-align="right" is-link readonly @click="toshowDialog(2)" />
        <van-field v-model="userInfo.userPhone" :label="$t('personal.Phonenumber')" input-align="right" readonly />
      </van-cell-group>
      <van-cell-group inset class="user-detail">
        <van-field v-model="getPositon[userInfo.level]" :label="$t('router.Position')" input-align="right" readonly />
      </van-cell-group>
      <van-cell-group inset class="user-detail">
        <van-field v-model="userInfo.inviteCode" :label="$t('personal.Invitationcode')" input-align="right" readonly :right-icon="iconImg" @click="toCopyText(userInfo.inviteCode)" />
        <van-field v-model="userInfo.shareLink" class="textarea" type="textarea" :label="$t('personal.d3')" input-align="right" readonly :right-icon="iconImg" @click="toCopyText(userInfo.shareLink)" />
      </van-cell-group>
    </van-form>
    <van-dialog v-model:show="showDialog" :title="$t('new.d17')" showCancelButton :before-close="onSubmit">
      <div class="c2cForm">
        <div class="item">
          <div class="label" v-if="dialogType == 1">{{ $t('personal.Name') }}</div>
          <div class="label" v-if="dialogType == 2">{{ $t('personal.Lastname') }}</div>
          <div class="right">
            <input type="text" v-if="dialogType == 1" v-model="form.firstName" :placeholder="$t('personal.Pleaseenter')" />
            <input type="text" v-if="dialogType == 2" v-model="form.lastName" :placeholder="$t('personal.Pleaseenter')" />
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import i18n from '@/i18n/index'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/useCounterStore'
import { showToast } from 'vant'
import { clipboard } from '@/utils/common'

const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'userInfo'
})
const showDialog = ref(false)
const dialogType = ref(1)
const userStore = useCounterStore()
const { getPositon } = storeToRefs(userStore)
const fileList = ref([])
const form = ref({
  lastName: '',
  firstName: ''
})
const userInfo = ref({
  userPhone: '',
  avatar: '',
  zone: '',
  phone: '',
  inviteCode: '',
  level: '',
  shareLink: '',
  lastName: '',
  firstName: ''
})
const iconImg = new URL('@/assets/icon-copy.png', import.meta.url).href
const getUserInfo = () => {
  proxy.$api.userInfo().then((res: any) => {
    if (res.code !== 200) return
    userInfo.value = res.data
    form.value.lastName = userInfo.value.lastName
    form.value.firstName = userInfo.value.firstName
    userInfo.value.avatar ? fileList.value = [{ url: userInfo.value.avatar, isImage: true }] : fileList.value = []
    if (userInfo.value.zone && userInfo.value.phone) {
      userInfo.value.userPhone = '+' + userInfo.value.zone + userInfo.value.phone
    } else if (userInfo.value.phone) {
      userInfo.value.userPhone = userInfo.value.phone
    }
    userInfo.value.shareLink = window.location.origin + '/#/register?inviteCode=' + userInfo.value.inviteCode
  })
}
const toCopyText = (text: string | Number) => {
  text = text || ''
  clipboard(text) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}
getUserInfo()
const onSubmit = (action, done) => {
  // 点击了确定按钮
  if (action === 'confirm') {
    let json = {}
    if (dialogType.value == 1) {
      json = { firstName: form.value.firstName }
    }
    if (dialogType.value == 2) {
      json = { lastName: form.value.lastName }
    }
    proxy.$api.profileUpdate(json).then((res: any) => {
      if (res.code !== 200) return
      showDialog.value = false
      getUserInfo()
      showToast(i18n.global.t('forget.Successfullymodified'))
    })
  } else {
    showDialog.value = false
  }
}

const toUpdateImg = (file: any) => {
  file.status = 'uploading'
  proxy.$api.imgUpload({ file: file.file }).then((res: any) => {
    if (res.code !== 200) {
      file.status = 'failed'
      return
    }
    let avatar = res.data
    proxy.$api.updateAvatar({ avatar: avatar }).then((resInfo: any) => {
      if (resInfo.code !== 200) {
        file.status = 'failed'
        return
      }
      file.status = 'done'
    })
  })
}
const toshowDialog = (type: number) => {
  showDialog.value = true
  dialogType.value = type
  form.value.firstName = userInfo.value.firstName
  form.value.lastName = userInfo.value.lastName
}
// toCreatePdf()
</script>
<style lang="scss" scoped>
@import './userInfo.scss';
</style>
