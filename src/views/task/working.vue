<template>
  <div class="working">
    <div class="topBar">
      <img src="@/assets/logo2.png" />
      <div class="right" v-if="!type">
        <div class="br1">
          <div class="label">{{ $t('working.earnings') }}：</div>
          <div class="num">{{ totalIncome || 0 }}</div>
          <span>USDT</span>
        </div>
        <div class="br2">{{ $t('new.d52') }}: {{ currentCount }}/{{ totalCount }}</div>
      </div>
    </div>
    <div class="formBox">
      <input type="text" v-model="code" :placeholder="$t('c2c.d153')" />
      <div class="btn" v-if="!isdisabled && time != 0" @click="submit">{{ $t('forget.submit') }}</div>
      <div class="btn dis" v-if="isdisabled">{{ $t('c2c.d149') }}</div>
      <div class="btn dis" v-if="time == 0">{{ $t('forget.submit') }}</div>
    </div>
    <div class="content">
      <div class="tit">
        <img src="@/assets/icon09.png" alt="" />
        <span>{{ $t('c2c.d154') }}</span>
      </div>
      <img class="codeImg" :src="codeImg" />

      <!-- <div class="input">
        <input type="text" v-model="code" :placeholder="$t('working.answer')" />
      </div>
      <div class="btn">
        <div></div>
        <div class="pubBtn" @click="refresh">{{ $t('working.pass') }} 不要</div>
        <div class="pubBtn" @click="submit">{{ $t('forget.submit') }}</div>
      </div> -->
      <div class="time" v-if="time != 0">
        {{ $t('working.Timeleft') }}：<span>{{ time }}S</span>
      </div>
      <div class="time" v-else>{{ $t('working.Timeleft') }}：{{ $t('working.Timedout') }}</div>
      <div class="tips size bold">{{ $t('c2c.d155') }}</div>
      <div class="tips bold red">① {{ $t('c2c.d156') }}</div>
      <div class="tips red mt12">{{ $t('c2c.d157') }}</div>
      <div class="tips red mt12">{{ $t('c2c.d158') }}</div>
      <div class="tips bold">② {{ $t('c2c.d159') }}</div>
      <div class="tips mt12">{{ $t('c2c.d160') }}</div>
      <div class="tips bold">③ {{ $t('c2c.d161') }}</div>
      <div class="tips mt12">{{ $t('c2c.d162') }}</div>
      <div class="tips mt12">{{ $t('c2c.d163') }}</div>
      <div class="tips mt12">{{ $t('c2c.d164') }}</div>
      <div class="tips bold">④ {{ $t('c2c.d165') }}</div>
      <div class="tips mt12">{{ $t('c2c.d166') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted } from 'vue'
import { Countdown } from '@/utils/common'
import { useRoute } from 'vue-router'
import router from '@/router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'task_working'
})

const route = useRoute()
let type = route.query.type
let taskId = route.query.id
const codeImg = ref<string>('')
const code = ref<string>('')
const totalIncome = ref<number>(0)
const currentCount = ref<number>(0)
const totalCount = ref<number>(0)
let answer: string
let codeId: string
let guideNum = parseInt(localStorage.getItem('guideNum'))

// 引导任务
const guideTask = () => {
  code.value = ''
  let guideNum2 = parseInt(localStorage.getItem('guideNum'))
  if (guideNum2 && guideNum2 > 0) {
    proxy.$api.nextGuideTask().then((res: any) => {
      if (res.code !== 200) return
      codeImg.value = res.data.codeUrl
      answer = res.data.answer
      localStorage.setItem('guideNum', (guideNum2 - 1).toString())
      timer.setDuration(60)
      initTime()
    })
  } else {
    showToast({
      message: i18n.global.t('working.Bootcompleted'),
      onClose: () => {
        router.push('/')
      }
    })
  }
}

// 正常下一个任务
const taskCode = () => {
  code.value = ''
  proxy.$api.taskNext(taskId).then((res: any) => {
    if (res.code == 600014) {
      router.push('/task')
      return
    }
    if (res.code !== 200) return
    codeImg.value = res.data.codeUrl
    codeId = res.data.id
    totalIncome.value = res.data.totalIncome
    currentCount.value = res.data.currentCount
    totalCount.value = res.data.totalCount
    timer.setDuration(60)
    initTime()
  })
}

// 继续当前的任务
const curTaskCode = () => {
  code.value = ''
  proxy.$api.getCurTaskNext(taskId).then((res: any) => {
    if (res.code == 600014) {
      router.push('/task')
      return
    }
    if (res.code !== 200) return
    if (res.data == null || !res.data.codeUrl || res.data.codeUrl == '') {
      taskCode()
      return
    }
    codeImg.value = res.data.codeUrl
    codeId = res.data.id
    totalIncome.value = res.data.totalIncome
    currentCount.value = res.data.currentCount
    totalCount.value = res.data.totalCount
    let curTime = 60 - (res.data.passTime ? parseInt(res.data.passTime) : 0)
    if (curTime < 0) {
      time.value = 0
    } else {
      timer.setDuration(curTime)
      initTime()
    }
  })
}

// 提交正常任务
let remainCount: number
const isdisabled = ref<boolean>(false)
const taskSubmit = () => {
  if (!code.value) {
    showToast(i18n.global.t('forget.pleaseenterverificationcode'))
    return
  }
  isdisabled.value = true
  const json = {
    contentId: codeId,
    answer: code.value
  }
  timer.stop()
  proxy.$api.taskSubmit(json).then((res: any) => {
    if (res.code !== 200) return
    code.value = ''
    totalIncome.value = res.data.totalIncome
    currentCount.value = res.data.currentCount
    totalCount.value = res.data.totalCount
    if (remainCount == 0) {
      showToast({
        message: i18n.global.t('working.Taskcompleted'),
        onClose: () => {
          router.push('/task')
        }
      })
    } else {
      isdisabled.value = false
      if (res.data.remainCount == 0) remainCount = 0
      codeImg.value = res.data.newContent.codeUrl
      codeId = res.data.newContent.id
      if (res.data.status === 2) showToast(i18n.global.t('working.Mistake'))
      if (res.data.status === 3) showToast(i18n.global.t('working.Correct'))
      if (res.data.status === 4) showToast(i18n.global.t('working.Timedout'))
      timer.setDuration(60)
      initTime()
    }
  })
}

// 引导任务
if (type) {
  if (guideNum && guideNum == 0) {
    showToast(i18n.global.t('working.Bootcompleted'))
    router.push('/')
  } else if (!guideNum) {
    proxy.$api.passGuide()
    proxy.$api.varGet('biz.guide.count').then((res: any) => {
      if (res.code !== 200) return
      localStorage.setItem('guideNum', res.data.value)
      guideTask()
    })
  } else {
    guideTask()
  }
}

// 提交按钮
const submit = () => {
  if (type) {
    if (!code.value) {
      showToast(i18n.global.t('forget.pleaseenterverificationcode'))
      return
    }
    code.value.toLowerCase() == answer.toLowerCase() ? showToast(i18n.global.t('working.Correct')) : showToast(i18n.global.t('working.Mistake'))
    guideTask()
  }
  if (taskId) {
    taskSubmit()
  }
}

// 跳过按钮
const refresh = () => {
  if (type) {
    guideTask()
  }
  if (taskId) {
    taskCode()
  }
}

// 暂停/开始
const isStart = ref<boolean>(true)
const iconClick = () => {
  isStart.value = !isStart.value
  isStart.value ? taskCode() : timer.stop()
}

// 倒计时
const time = ref<number>(60)
let timer = new Countdown(
  60,
  false,
  (remainingTime) => {
    time.value = Number.parseInt(remainingTime)
  },
  () => {
    if (time.value == 0) {
      let timer2 = setTimeout(() => {
        clearTimeout(timer2)
        if (type) {
          guideTask()
        }
        if (taskId) {
          taskCode()
        }
      }, 2000)
    } else {
      if (type) {
        guideTask()
      }
      if (taskId) {
        taskCode()
      }
    }
  }
)

// 初始化倒计时
const initTime = () => {
  time.value = null
  timer.reset()
  timer.start()
}
// 正常任务
if (taskId) {
  //taskCode()
  curTaskCode()
}

// 离开页面清除倒计时
onUnmounted(() => {
  if (timer) timer.stop()
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
