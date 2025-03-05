<template>
  <div class="home">
    <van-swipe :width="swipeWidth" :autoplay="autoplay">
      <van-swipe-item v-for="item in banner" @click="goPage(item)"><img class="img" :src="item.image" /></van-swipe-item>
    </van-swipe>
    <div class="pubBg br1">
      <img class="bigImg" src="@/assets/img2.png" />
      <div class="tit">
        <div class="b">{{ $t('new.d5') }}</div>
        <div class="p">{{ $t('new.d6') }}</div>
      </div>
      <div class="iconList">
        <div class="item">
          <img src="@/assets/icon05.png" />
          <div class="text">
            <div class="b">{{ $t('new.d7') }}</div>
            <div class="p">{{ $t('new.d8') }}</div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/icon06.png" />
          <div class="text">
            <div class="b">{{ $t('new.d9') }}</div>
            <div class="p">{{ $t('new.d10') }}</div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/icon07.png" />
          <div class="text">
            <div class="b">{{ $t('new.d11') }}</div>
            <div class="p">{{ $t('new.d12') }}</div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/icon08.png" />
          <div class="text">
            <div class="b">{{ $t('new.d13') }}</div>
            <div class="p">{{ $t('new.d14') }}</div>
          </div>
        </div>
      </div>
      <!-- <div class="pre" v-html="data.article && data.article[0].content"></div> -->
      <div class="ours">
        <div class="tit">{{ $t('router.AboutUs') }}</div>
        <div class="list">
          <div class="item" v-for="item in oursList" @click="goPage(item)">
            <img class="left" :src="item.image" />
            <div class="right">
              <div class="t">{{ item.title }}</div>
              <div class="br">
                <div class="time">{{ item.createTime }}</div>
                <div class="def">{{ $t('article.checkthedetails') }}<van-icon name="arrow" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task" v-for="item in data.typeList">
      <div class="left">
        <img :src="item.image" alt="" />
      </div>
      <div class="right">
        <div class="tit">
          <div class="b">{{ item.name }}</div>
          <div class="p">{{ $t('home.WorkTime') }}：{{ item.limitTime }}{{ $t('home.TimeUnit') }}</div>
        </div>
        <div class="btnBox">
          <div class="price">
            <img src="@/assets/icon_usdt.png" />
            <div class="span">{{ $t('home.FrozenAmount') }}：{{ item.frozenAmount }}U</div>
          </div>
          <div :class="item.status == 1 ? 'btn cur' : 'btn'" @click="start(item)">{{ $t('home.start') }}</div>
        </div>
      </div>
    </div>

    <van-dialog v-model:show="show" :title="showTitle" :confirm-button-text="$t('home.agree')" @confirm="confirm" show-cancel-button>
      <div class="dialog-p" v-html="showContent"></div>
    </van-dialog>

    <van-dialog v-model:show="show2" :title="$t('home.margin')" :confirm-button-text="$t('home.Ihavepaid')" :before-close="sunbmit" show-cancel-button>
      <div class="dialog-lv">
        <!-- <van-field v-model="levelName" is-link readonly :label="$t('home.Tasklevel')" :placeholder="$t('home.pleasechoose')" @click="showPicker = true" />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="level" :columns-field-names="{ text: 'name', value: 'level' }" @cancel="showPicker = false" @confirm="onConfirm" visible-option-num="3" />
        </van-popup> -->
        <div class="content">
          <div class="p">
            <div class="label">{{ $t('home.Tasklevel') }}</div>
            <div class="span">{{ levelName }}</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.openCondition') }}</div>
            <div class="span">{{ openCondition }}%</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.Requiredmargin') }}</div>
            <div class="span color">{{ price }} USDT</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.d1') }}</div>
            <div class="span">{{ amount }} USDT</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.predictDayIncome') }}</div>
            <div class="span">{{ toFixedNumber(dayAmount, 2) }} USDT</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.predictWeekIncome') }}</div>
            <div class="span">{{ toFixedNumber(weekAmount, 2) }} USDT</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.predictMonthIncome') }}</div>
            <div class="span">{{ toFixedNumber(monthAmount, 2) }} USDT</div>
          </div>
          <div class="tips">{{ $t('home.d2') }}</div>
          <!-- <div class="time pt0">
            {{ $t('home.Countdown') }}
            <span>{{ time }}</span>
            {{ $t('home.Expiresafter') }}
          </div> -->
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, watch, onMounted, onBeforeUnmount } from 'vue'
import { Countdown, toFixedNumber } from '@/utils/common'
import router from '@/router'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'login'
})
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
})

// swipe滑块宽度自应
const swipeWidth = ref<any>(parseFloat(window.getComputedStyle(document.documentElement).fontSize) * 9)
const screenWidth = ref(window.innerWidth)
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth)
})
watch(screenWidth, (newWidth, oldWidth) => {
  swipeWidth.value = parseFloat(window.getComputedStyle(document.documentElement).fontSize) * 9
})

const data = reactive<any>({})
const banner = ref<any>([])
const autoplay = ref<number>(0)
const oursList = ref<any>([])
const articleList = () => {
  const json = {
    lang: localStorage.getItem('language') || 'en-US',
    type: 3
  }
  proxy.$api.articleList(json).then((res: any) => {
    if (res.code !== 200) return
    data.article = res.data
  })
  proxy.$api.imageJumpList().then((res: any) => {
    if (res.code !== 200) return
    banner.value = res.data.imageJumps
    autoplay.value = res.data.autoplay
  })
  proxy.$api
    .articleList({
      lang: localStorage.getItem('language') || 'zh-CN',
      type: 5
    })
    .then((res: any) => {
      if (res.code !== 200) return
      oursList.value = res.data
    })
}
articleList()

const goPage = (item: any) => {
  if (item.url) {
    router.push(item.url)
    return
  }
  if (item.content) {
    router.push('/article/info')
    localStorage.setItem('detail', item.content)
    return
  }
}

const taskTypeList = () => {
  proxy.$api.taskTypeList().then((res: any) => {
    if (res.code !== 200) return
    data.typeList = res.data
  })
}
taskTypeList()

const level = ref<any>([])
const taskId = ref<string>('')
const getPop = () => {
  // proxy.$api.taskLevel(taskId.value).then((res: any) => {
  //   if (res.code !== 200) return
  //   level.value = res.data
  // })
  proxy.$api.walletInfo().then((res: any) => {
    if (res.code !== 200) return
    amount.value = res.data.amount
  })
}
const levelValue = ref('')
const levelName = ref('')
const price = ref('0')
const openCondition = ref('0')
const amount = ref(0)
const dayAmount = ref(0)
const weekAmount = ref(0)
const monthAmount = ref(0)
const showPicker = ref(false)
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  levelValue.value = selectedOptions[0].level
  levelName.value = selectedOptions[0].name
  price.value = selectedOptions[0].frozenAmount
}
const sunbmit = (action, done) => {
  // 点击了确定按钮
  if (action === 'confirm') {
    // if (!levelValue.value) {
    //   showToast(i18n.global.t('home.Pleaseselectalevel'))
    // } else {
    //   let json = {
    //     level: levelValue.value,
    //     taskType: taskId.value,
    //     newTask: true
    //   }
    //   proxy.$api.taskOpen(json).then((res: any) => {
    //     if (res.code !== 200) return
    //     showToast(i18n.global.t('home.Paymentsuccessful'))
    //     show2.value = false
    //     taskTypeList()
    //   })
    // }

    let json = {
      taskType: taskId.value
    }
    proxy.$api.taskOpen(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('home.Paymentsuccessful'))
      show2.value = false
      taskTypeList()
    })
  } else {
    show2.value = false
  }
}

const time = ref<string>('')
const timer = new Countdown(
  60 * 15,
  true,
  (remainingTime) => {
    time.value = remainingTime
  },
  () => {
    // console.log('倒计时结束')
  }
)

const show = ref<boolean>(false)
const showTitle = ref<string>('')
const showContent = ref<string>('')
const start = (item: any) => {
  if (item.status === 0) showToast(i18n.global.t('home.Thetasklimithasbeenreached'))
  if (item.status === 1) router.push('/task')
  if (item.status === 2) {
    show.value = true
    showTitle.value = item.name
    showContent.value = i18n.global.t('cexp.task' + item.id)
    // proxy.$api
    //   .taskText({
    //     langType: localStorage.getItem('language') || 'zh-CN',
    //     taskTypeId: item.id
    //   })
    //   .then((res: any) => {
    //     if (res.code !== 200) return
    //     showContent.value = res.data && res.data.content
    //   })

    taskId.value = item.id
    price.value = item.frozenAmount
    levelName.value = item.name
    openCondition.value = item.openCondition
    // 计算每天 周 月收入
    dayAmount.value = (item.income / item.passCount) * item.contentCount
    const weekDay = item.limitTime > 7 ? 7 : item.limitTime
    weekAmount.value = (item.income / item.passCount) * item.contentCount * weekDay
    const monthDay = 30
    monthAmount.value = (item.income / item.passCount) * item.contentCount * monthDay
  }
}

const show2 = ref<boolean>(false)
const confirm = () => {
  show2.value = true
  // levelValue.value = ''
  // levelName.value = ''
  // time.value = ''
  // timer.reset()
  // timer.start()
  getPop()
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
