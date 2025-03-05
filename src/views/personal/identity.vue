<template>
  <div class="personal">
    <div class="pubBg">
      <div class="form">
        <div class="item">
          <div class="label">{{ $t('identity.d2') }}</div>
          <div class="right">
            <input type="text" :readonly="status == 1 || status == 2" v-model="name" :placeholder="$t('identity.d3')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('identity.d4') }}</div>
          <div class="right">
            <input type="text" :readonly="status == 1 || status == 2" v-model="cardId" @input="validateInput" :placeholder="$t('identity.d5')" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('identity.d6') }}</div>
        </div>
        <div class="item">
          <van-uploader v-model="fileList" max-count="2" :disabled="status == 1 || status == 2" :deletable="status == 0 || status == 3" :after-read="afterRead" />
        </div>
      </div>

      <!-- <div class="input t50">
        <div class="label">{{ $t('identity.d2') }}</div>
        <div class="text">
          <input type="text" v-model="name" :placeholder="$t('identity.d3')" />
        </div>
      </div>
      <div class="input t50">
        <div class="label">{{ $t('identity.d4') }}</div>
        <div class="text">
          <input type="text" v-model="cardId" :placeholder="$t('identity.d5')" />
        </div>
      </div> -->
    </div>
    <div class="tips0 p36">
      {{ $t('identity.d9') }}<br />
      1. {{ $t('identity.d10') }}<br />
      2. {{ $t('identity.d11') }}<br />
      3. {{ $t('identity.d12') }}
    </div>
    <div v-if="status == 0" class="pubBtn bigBtn" @click="submit">{{ $t('forget.submit') }}</div>
    <div v-if="status == 1" class="pubBtn bigBtn disabled">{{ $t('error600025') }}</div>
    <div v-if="status == 2" class="pubBtn2 bigBtn">{{ $t('c2c.d151') }}</div>
    <div v-if="status == 3" class="pubBtn bigBtn" @click="submit">{{ $t('c2c.d150') }}</div>
    <div v-if="status == 3 && notes" class="tips p36">{{ $t('c2c.d152') }} : {{ notes }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_identity'
})

const name = ref<string>('')
const cardId = ref<string>('')

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const regex = /^[a-zA-Z0-9]*$/ // 只允许英文和数字
  if (!regex.test(target.value)) {
    target.value = target.value.replace(/[^a-zA-Z0-9]/g, '') // 移除不符合的字符
  }
  cardId.value = target.value // 更新绑定的值
}

// 图片上传
const fileList = ref<any>([])
const afterRead = (file: any) => {
  file.status = 'uploading'
  proxy.$api.imgUpload({ type: 1, file: file.file }).then((res: any) => {
    if (res.code !== 200) {
      file.status = 'failed'
      return
    }
    file.url = res.data
    file.status = 'done'
  })
}

const router = useRouter()
const submit = () => {
  if (!name.value) {
    showToast(i18n.global.t('identity.d3'))
    return
  }
  if (!cardId.value) {
    showToast(i18n.global.t('identity.d5'))
    return
  }
  if (fileList.value.length == 0) {
    showToast(i18n.global.t('identity.d7'))
    return
  }
  let json = {
    name: name.value,
    cardId: cardId.value,
    images: []
  }
  for (let i = 0; i < fileList.value.length; i++) {
    if (fileList.value[i].url) json.images[i] = fileList.value[i].url
  }
  if (json.images.length == 0) {
    showToast(i18n.global.t('identity.d7'))
    return
  }
  proxy.$api.authSubmit(json).then((res: any) => {
    if (res.code !== 200) return
    showToast(i18n.global.t('identity.d8'))
    goBack()
  })
}

const goBack = () => {
  router.go(-1)
}

// 实名认证状态status 0 -未提交，1-提交，2-通过，3- 失败
const status = ref<any>('')
const notes = ref<string>(null)
proxy.$api.authRecord().then((res: any) => {
  if (res.code !== 200) return
  status.value = res.data.status
  notes.value = res.data.notes
  if (status.value == 0 || status.value == 3) return
  name.value = res.data.name
  cardId.value = res.data.cardId
  let images = JSON.parse(res.data.images)
  fileList.value = []
  for (let i = 0; i < images.length; i++) {
    fileList.value[i] = { url: images[i] }
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
