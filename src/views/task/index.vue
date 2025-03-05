<template>
  <div class="task mt230">
    <div class="income">
      <div class="total">
        <div class="t">{{ $t('task.Totalrevenue') }}</div>
        <div class="num">
          <div class="span">
            <span>{{ assetsInfo.totalIncome || 0 }}</span
            >USDT
          </div>
          <router-link to="/personal/assets">{{ $t('task.Check') }}</router-link>
        </div>
      </div>
      <div class="pubBg type">
        <div class="br">
          <div class="t">{{ $t('task.Incomeoftheda') }}（USDT）</div>
          <div class="num">{{ assetsInfo.todayIncome || 0 }}</div>
        </div>
        <div class="br2">
          <div class="item">
            <div class="t">{{ $t('task.Yesterday') }}（USDT）</div>
            <div class="num">{{ assetsInfo.yesterdayIncome || 0 }}</div>
          </div>
          <div class="item">
            <div class="t">{{ $t('task.month') }}（USDT）</div>
            <div class="num">{{ assetsInfo.thisMonthIncome || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="title">{{ $t('task.Today') }}</div>
      <div class="item" v-for="item in today">
        <div class="tr">
          <div class="left">
            <img :src="item.taskTypeInfo.image" alt="" />
          </div>
          <div class="right">
            <div class="tit">
              <div class="b">{{ item.taskTypeInfo.name }}</div>
              <div class="p">{{ $t('task.remainTime') }}：{{ item.remainTime }}{{ $t('home.TimeUnit') }}</div>
            </div>
            <div class="price">
              <img src="@/assets/icon_usdt.png" />
              <div class="span">{{ $t('task.Complete') }}：{{ item.finshIncome }} USDT</div>
            </div>
          </div>
        </div>
        <div class="btnBox">
          <span>{{ $t('task.todayTaskCount') }}：{{ item.totalCount }}</span>
          <router-link class="btn" :to="'/task/working?id=' + item.id">{{ $t('task.Startcoding') }}</router-link>
        </div>
      </div>
      <div class="empty" v-if="today.length <= 0">{{ $t('page.Nodata') }}</div>
    </div>

    <div class="list2">
      <div class="title">{{ $t('task.Completed') }}</div>
      <template v-for="item in finish">
        <div class="item" v-if="item.totalCount != 0">
          <div class="tr">
            <img class="left" :src="item.taskTypeInfo.image" alt="" />
            <div class="right">
              <div class="tit">
                <div class="b">{{ item.taskTypeInfo.name }}</div>
              </div>
              <div class="price">
                <img src="@/assets/icon_usdt.png" />
                <div class="span">{{ $t('task.Complete') }}：{{ item.finshIncome }} USDT</div>
              </div>
            </div>
          </div>
          <div class="br2">
            <div class="item2">
              <div class="num">{{ item.totalCount || 0 }}</div>
              <div class="t">{{ $t('task.Numberofverifications') }}</div>
            </div>
            <div class="item2">
              <div class="num">{{ item.totalIncome || 0 }}</div>
              <div class="t">{{ $t('task.Actualincome') }}（USDT）</div>
            </div>
          </div>
          <div class="br2">
            <div class="item2">
              <div class="num">{{ item.Correctrate }} %</div>
              <div class="t">{{ $t('task.Correctrate') }}</div>
            </div>
            <div class="item2">
              <div class="num">{{ item.Errorrate }} %</div>
              <div class="t">{{ $t('task.Errorrate') }}</div>
            </div>
          </div>
        </div>
      </template>
      <div class="more" @click="more" v-if="isMore">{{ $t('page.more') }}</div>
      <div class="empty" @click="more" v-if="finish.length > 0 && !isMore">{{ $t('page.final') }}</div>
      <div class="empty" v-if="finish.length <= 0">{{ $t('page.Nodata') }}</div>
    </div>

    <van-dialog v-model:show="show" :title="$t('personal.Margin')" :confirm-button-text="$t('home.Ihavepaid')" :before-close="sunbmit" show-cancel-button>
      <div class="dialog-lv">
        <van-field v-model="levelName" is-link readonly :label="$t('home.Tasklevel')" :placeholder="$t('home.pleasechoose')" @click="showPicker = true" />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="level" :columns-field-names="{ text: 'name', value: 'level' }" @cancel="showPicker = false" @confirm="onConfirm" visible-option-num="3" />
        </van-popup>
        <div class="content">
          <div class="p mt6">
            <div class="label">{{ $t('home.Requiredmargin') }}</div>
            <div class="span">{{ price }} USDT</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('home.d1') }}</div>
            <div class="span">{{ amount }} USDT</div>
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
import { ref, getCurrentInstance } from 'vue'
import { Countdown, toFixedNumber } from '@/utils/common'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'task'
})
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
})

const assetsInfo = ref<any>({})
proxy.$api.walletIncome().then((res: any) => {
  if (res.code !== 200) return
  assetsInfo.value = res.data
})

let todayPage = {
  pageNum: 1,
  pageSize: 100,
  type: 1
}
let finishPage = {
  pageNum: 1,
  pageSize: 5,
  type: 2
}
const today = ref<any>([])
const finish = ref<any>([])
const isMore = ref<boolean>(true)
const taskPage = (json) => {
  proxy.$api.taskPage(json).then((res: any) => {
    if (res.code !== 200) return
    if (json.type == 1) today.value = res.data.records
    if (json.type == 2) {
      if (finishPage.pageNum == 1) {
        finish.value = res.data.records
      } else {
        finish.value = [...finish.value, ...res.data.records]
      }
      if (finish.value.length >= res.data.total) isMore.value = false
    }

    for (let i = 0; i < today.value.length; i++) {
      today.value[i].finshIncome = toFixedNumber((today.value[i].taskTypeInfo.income / today.value[i].taskTypeInfo.passCount) * today.value[i].totalCount, 6) // 完成预计收入
    }
    for (let i = 0; i < finish.value.length; i++) {
      finish.value[i].Correctrate = ((finish.value[i].passCount / finish.value[i].totalCount) * 100).toFixed(0) // 正确率
      finish.value[i].Errorrate = 100 - finish.value[i].Correctrate // 错误率
      finish.value[i].finshIncome = toFixedNumber((finish.value[i].taskTypeInfo.income / finish.value[i].taskTypeInfo.passCount) * finish.value[i].totalCount, 6) // 完成预计收入
    }
  })
}

const more = () => {
  if (isMore.value) {
    finishPage.pageNum++
    taskPage(finishPage)
  }
}
taskPage(todayPage)
taskPage(finishPage)

const level = ref<any>([])
const taskId = ref<string>('')
const amount = ref<string>('')
const curLevel = ref<number>(0)
const getPop = () => {
  proxy.$api.taskLevel(taskId.value).then((res: any) => {
    if (res.code !== 200) return
    let data = []
    for (let i = 0; i < res.data.length; i++) {
      if (curLevel.value < res.data[i].level) {
        data.push(res.data[i])
      }
    }
    level.value = data
  })
  proxy.$api.walletInfo().then((res: any) => {
    console.log(res)
    if (res.code !== 200) return
    amount.value = res.data.amount
  })
}
const levelValue = ref('')
const levelName = ref('')
const price = ref('0')
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
    //     newTask: false
    //   }
    //   proxy.$api.taskOpen(json).then((res: any) => {
    //     if (res.code !== 200) return
    //     showToast(i18n.global.t('home.Paymentsuccessful'))
    //     show.value = false
    //     taskPage(todayPage)
    //   })
    // }

    let json = {
      taskType: taskId.value
    }
    proxy.$api.taskOpen(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('home.Paymentsuccessful'))
      show.value = false
      taskPage(todayPage)
    })
  } else {
    show.value = false
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
const showDialog = (item: any) => {
  if (false) {
    showToast(i18n.global.t('task.levellimit'))
  } else {
    showToast(i18n.global.t('task.openlevel'))

    // // timer.reset()
    // // timer.start()
    // levelValue.value = ''
    // levelName.value = ''
    // show.value = true
    // taskId.value = item.taskType
    // curLevel.value = item.taskLevel
    //getPop()
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
