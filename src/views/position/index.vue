<template>
  <div class="positionIndex">
    <div class="topLevel" >
        <van-swipe class="my-swipe" id="myS" ref="mySwipe"  :loop='false' :width='swipItemWidth' @change="onchange" :show-indicators='false' indicator-color="white">
        <van-swipe-item >
          <div class="swipItem" ref='swipItem' >
            <div class="swip-txt" v-if="userInfo.userLevel==0||userInfo.userLevel==1||userInfo.userLevel==2">{{ $t('position.d5') }}</div>
            <div class="staff-title">{{ (userInfo.userLevel==2||userInfo.userLevel>2)?getPositon['2']: getPositon[userInfo.userLevel]}}</div>
            <img class="swip-idcart" src="@/assets/pic-cart1.png" alt="">
            <div class="swip-left">
                <span class="swip-task">{{ $t('position.d6') }}</span>
                <div class="swip-line"></div>
                <span class="swip-left-txt">{{userInfo.isSwitchTask? userInfo.userTaskName:$t('position.s94') }}</span>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>          
          <div class="swipItem" >
            <div class="swip-txt" v-if="userInfo.userLevel==3">{{ $t('position.c001') }}</div>
            <div class="staff-title">{{ getPositon['3'] }}</div>
            <!-- <img class="swip-title" src="@/assets/iconcur11.png" alt=""> -->
            <img class="swip-idcart" src="@/assets/pic-cart2.png" alt="">
            <span class="swip-mo">{{ $t('position.d43') }} <br/><i>${{leveObj[3]?.wage||0}}</i></span>
            <div class="swip-btn" @click="getUserGetMonthly" v-if="userInfo.userLevel==3">
              {{ $t('position.c046') }}
              <img src="@/assets/icon-arrow2.png" alt="">
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item >
          <div class="swipItem" >
            <div class="swip-txt" v-if="userInfo.userLevel==4">{{ $t('position.c001') }}</div>
            <div class="staff-title">{{ getPositon['4'] }}</div>
            <!-- <img class="swip-title" src="@/assets/iconcur11.png" alt=""> -->
            <img class="swip-idcart" src="@/assets/pic-cart3.png" alt="">
            <span class="swip-mo">{{ $t('position.d43') }} <br/><i>${{leveObj[4]?.wage||0}}</i></span>
            <div class="swip-btn" @click="getUserGetMonthly" v-if="userInfo.userLevel==4">
              {{ $t('position.c046') }}
              <img src="@/assets/icon-arrow3.png" alt="">
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item >
          <div class="swipItem" >
            <div class="swip-txt" v-if="userInfo.userLevel==5">{{ $t('position.c001') }}</div>
            <div class="staff-title">{{ getPositon['5'] }}</div>
            <!-- <img class="swip-title" src="@/assets/iconcur11.png" alt=""> -->
            <img class="swip-idcart" src="@/assets/pic-cart4.png" alt="">
            <span class="swip-mo">{{ $t('position.d43') }} <br/><i>${{leveObj[5]?.wage||0}}</i></span>
            <div class="swip-btn" @click="getUserGetMonthly" v-if="userInfo.userLevel==5">
              {{ $t('position.c046') }}
              <img src="@/assets/icon-arrow4.png" alt="">
            </div>
          </div>
        </van-swipe-item>
        </van-swipe>
    </div>
    
    <div class="leveDetail">
      <router-link class="team"  to="/personal/children" >
        <div class="team-left">
          <img  v-for="(item,index) in temList" :key="index" :src="item.url" alt="">
        </div>
        <div class="team-right">
          <span class="right-txt">{{ $t('position.c044') }}</span>
          <img src="@/assets/icon-jt.png" alt="">
        </div>
        
      </router-link>
      <div :class="['detail-item',index==detailObj[currentIndex].length-1?'last':'']" v-for="(item,index) in detailObj[currentIndex]" :key="index">
          <div class="detail-title">{{item.title}}</div>
          <div class="item-txt" @click="getLevel(index)">
              <template v-for="(item2,index) in item.txt" :key="index">
                  <div v-html="item2" ></div>
              </template>
              <div v-if="index ==0&&!item.speedNoShow" class="item-text-j" >
                <div class="speed">
                  <div class="speed-left" :style="toGetSpeedStyle(item)"></div>
                  <div class="speed-text">{{ item.speed>=item.total?item.total:item.speed }}/{{ item.total }}</div>
                </div>
                <img class="jiantou" src="@/assets/icon-speed.png" />
              </div>
            </div>
      </div>
    
      <div class="teamM" v-if="currentIndex==0">
        <div class="team-title">{{ $t('position.d15') }}</div>
        <div class="team-content">
          <div class="conttent-top">
            <img src="@/assets/mone01.png" alt="">
            <span class="mid-t">{{ $t('position.d16') }}</span>
            <span class="t-btn" @click="toShowDetail('type1')">{{ $t('task.Check') }}</span>
          </div>
          <div class="content-txt">
            ·<span v-html=" $t('position.d17') "></span><br/>
            ·<span v-html=" $t('position.d18') "></span>
          </div>
        </div>
        <div class="team-content">
          <div class="conttent-top">
            <img src="@/assets/mone02.png" alt="">
            <span class="mid-t">{{ $t('position.d19') }}</span>
            <span class="t-btn" @click="toShowDetail('type2')">{{ $t('task.Check') }}</span>
          </div>
          <div class="content-txt">
            ·<span v-html=" $t('position.d20') "></span>
            <br/>
            ·<span v-html=" $t('position.d21') "></span>
          </div>
        </div>
        <div class="team-content">          
          <div class="content-txt">
            <span v-html=" $t('position.d22') "></span>
          </div>
        </div>
      </div>
      
    </div>
    <van-dialog v-model:show="isShowDialog"  :show-confirm-button="false" class="dialog1">
      <div class="dialog-body">
        <div class="dialog-title">{{dialogObj[currentDialog].title}}</div>
        <van-icon class="icon-close" name="cross" @click="isShowDialog = false" />
        <div class="dialog-content">
          <div class="dialog-item" v-for="(item,index) in dialogObj[currentDialog].detail" :key="index">
              <div class="dialog-name">{{item.name}}</div>
              <div class="dialog-text" v-html="item.text"></div>
          </div>
        </div>
      </div>
    </van-dialog>

    <van-dialog v-model:show="showPeople" :title="titleText" :show-confirm-button="false">
      <div class="c2cFormHeight">
        <div class="c2cForm">
          <van-icon class="close" name="cross" @click="showPeople = false" />
          <div class="item" v-for="(item,index) in peopleList" :key="index">
            <div class="lr">
              <div class="label">{{item}}</div>
              <div class="span">{{$t('task.Completed')}}</div>
            </div>
          </div>
          <div class="empty" v-if="peopleList.length <= 0">{{ $t('page.Nodata') }}</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance ,onMounted,onUnmounted} from 'vue'
import { SwipeInstance ,showDialog} from 'vant';
import { useRoute } from 'vue-router'
import i18n from '@/i18n/index'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/useCounterStore'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'position'
})
const userStore = useCounterStore()
const { getPositon } = storeToRefs(userStore)
const swipItem= ref(null)
const swipItemWidth = ref(0)
const currentIndex = ref(0)
const leveObj = ref({})
const detailObj = ref({
  0:[
    {title:i18n.global.t('position.d7'),txt:[i18n.global.t('position.d8')],speedNoShow:true},
    {title:i18n.global.t('position.d9'),txt:[i18n.global.t('position.d10')]},
    {title:i18n.global.t('position.d11'),txt:[i18n.global.t('position.d12')]},
    {title:i18n.global.t('position.d13'),txt:[i18n.global.t('position.d14')]},
  ],
  1:[
    {speed:0,total:0,title:i18n.global.t('position.d24'),txt:[i18n.global.t('position.d25',{peNum:0})]},
    {title:i18n.global.t('position.d26'),txt:[i18n.global.t('position.d27'),i18n.global.t('position.d28'),i18n.global.t('position.d29'),i18n.global.t('position.d30')]},
    {title:i18n.global.t('position.d31'),txt:[i18n.global.t('position.d32'),i18n.global.t('position.d33'),i18n.global.t('position.d34')]},
    {title:i18n.global.t('position.d35'),txt:[i18n.global.t('position.d36'),i18n.global.t('position.d37')]},
    {title:i18n.global.t('position.d38'),txt:[i18n.global.t('position.d39'),i18n.global.t('position.d40'),i18n.global.t('position.d41')]}
  ],
  2:[
    {speed:0,total:0,title:i18n.global.t('position.d44'),txt:[i18n.global.t('position.d45',{peNum:0})]},
    {title:i18n.global.t('position.d46'),txt:[i18n.global.t('position.d47'),i18n.global.t('position.d48'),i18n.global.t('position.d49'),i18n.global.t('position.d50')]},
    {title:i18n.global.t('position.d51'),txt:[i18n.global.t('position.d52'),i18n.global.t('position.d53'),i18n.global.t('position.d54'),i18n.global.t('position.d55'),i18n.global.t('position.d56'),i18n.global.t('position.d57'),i18n.global.t('position.d58'),i18n.global.t('position.d59'),i18n.global.t('position.d60'),i18n.global.t('position.d61'),i18n.global.t('position.d62')]},
    {title:i18n.global.t('position.d63'),txt:[i18n.global.t('position.d64'),i18n.global.t('position.d65'),i18n.global.t('position.d66')]},
  ],
  3:[
    {speed:0,total:0,title:i18n.global.t('position.d68'),txt:[i18n.global.t('position.d69'),i18n.global.t('position.d70')]},
    {title:i18n.global.t('position.d71'),txt:[i18n.global.t('position.d72'),i18n.global.t('position.d73'),i18n.global.t('position.d74'),i18n.global.t('position.d75')]},
    {title:i18n.global.t('position.d76'),txt:[i18n.global.t('position.d77'),i18n.global.t('position.d78'),i18n.global.t('position.d79'),i18n.global.t('position.d80')]}
  ],
})

const temList = ref([
  {url:new URL('../../assets/people1.png', import.meta.url).href},
  {url:new URL('../../assets/people2.png', import.meta.url).href},
  {url:new URL('../../assets/people3.png', import.meta.url).href},
  {url:new URL('../../assets/people4.png', import.meta.url).href},
  {url:new URL('../../assets/people5.png', import.meta.url).href},
  {url:new URL('../../assets/people6.png', import.meta.url).href}
])
const mySwipe = ref(null)
const deviceWidth = ref(window.innerWidth)
const maginLeftWidth = ref(0)
const isShowDialog = ref(false)
const currentDialog = ref('type1')
const dialogObj = ref({
  type1:{
    title:i18n.global.t('position.d81'),
    detail:[
      {name:i18n.global.t('position.d81'),text:i18n.global.t('position.d82')},
      {name:i18n.global.t('position.d83'),text:i18n.global.t('position.d84')},
      {name:i18n.global.t('position.d85'),text:i18n.global.t('position.d86')},
      ]
  },
  type2:{
    title:i18n.global.t('position.d87'),
    detail:[
      {name:i18n.global.t('position.d87'),text:i18n.global.t('position.d88')},
      {name:i18n.global.t('position.d89'),text:i18n.global.t('position.d90')}
      ]
  }
})
const userInfo = ref({userLevel:0,userTaskName:'',isSwitchTask:false})

const updateWindowSize = () => {
    swipItemWidth.value = swipItem.value.offsetWidth;
    maginLeftWidth.value = 30/750*deviceWidth.value
};
onMounted(() => { 
  maginLeftWidth.value = 30/750*deviceWidth.value
  swipItemWidth.value = swipItem.value.offsetWidth
  getUserLevelInfo()  
  toChangeSwiperMargin(currentIndex.value)
  window.addEventListener('resize', updateWindowSize);
});

const toChangeSwiperMargin = (index)=>{
  let EL = ref(document.getElementById('myS').getElementsByClassName('van-swipe__track')[0])
  let w  = 0
  if(index==0){
    w = 1*maginLeftWidth.value
  }
  if(index==1){
    w = 0*maginLeftWidth.value
  }
  if(index==2){
    w = -1*maginLeftWidth.value
  }
  if(index==3){
    w = -6*maginLeftWidth.value
  }
  if (EL.value) {
    (EL.value as HTMLElement).style.marginLeft = w + 'px'
  }
}

const onchange =(index)=>{    
    currentIndex.value = index
    toChangeSwiperMargin(index)
}
const toGetSpeedStyle = ({speed=0,total=1})=>{
  if(speed>=total) return {width:'100%'}
  if(total<1) return ''
  let width = (speed / total * 100).toFixed(0) +'%'
  return {width}
}
const toShowDetail = (type:string)=>{
  currentDialog.value = type
  isShowDialog.value = true
}
// 领取
const getUserGetMonthly = () => {//申请领取月薪
  proxy.$api.getUserGetMonthly().then((res: any) => {
      if(res.code!=200) return
      let msg = ''
      if(res.data.status==0){       
        msg =i18n.global.t('position.d91') 
      }
      if(res.data.status==1){
        msg = i18n.global.t('position.d92') 
      }
      if(res.data.status==2){
        msg = i18n.global.t('position.d93') +(res.data.nextDay||0)+ i18n.global.t('position.d94')
      }
      showDialog({ message: msg });
      // status 0第一次领取 1领取中 2已领取  天数  nextDay
  })
}
const getUserLevelInfo = () => { //获取当前用户职位等信息
  proxy.$api.getUserLevelInfo().then((res: any) => {
      if(res.code!=200) return
      userInfo.value = res.data
      getCurrentUser(userInfo.value.userLevel)
      mySwipe.value?.swipeTo(currentIndex.value,{immediate:true})
      
  })
}
const getUserInfoSteep = () => { //获取用户的所有等级进度条
  proxy.$api.getUserInfoSteep().then((res: any) => {
      if(res.code!=200) return
    let list = res.data || []
    list.map(item => {        
      leveObj.value[item.level] = item
    })
      list.map(item=>{
        if(item.level==3){
            detailObj.value[1][0].speed= item.actualActiveUserCount
            detailObj.value[1][0].total= item.activeUserCount
            detailObj.value[1][0].txt = [i18n.global.t('position.d25',{peNum:item.activeUserCount})]
            detailObj.value[1][4].txt[0] = i18n.global.t('position.d39',{peNum:item.activeUserCount})
            detailObj.value[1][4].txt[1] = i18n.global.t('position.d40',{peNum:item.activeUserCount})
        }
        if(item.level==4){
            detailObj.value[2][0].speed= item.actualActiveUserCount
            detailObj.value[2][0].total = item.activeUserCount
            detailObj.value[2][0].txt = [i18n.global.t('position.d45',{peNum:item.activeUserCount})]
            detailObj.value[2][3].txt[0] = i18n.global.t('position.d64',{peNum:item.activeUserCount})
            detailObj.value[2][3].txt[1] = i18n.global.t('position.d65',{peNum:leveObj.value['3'].activeUserCount,peNum1:item.activeUserCount})
        }
        if(item.level==5){
            detailObj.value[3][0].speed= item.actualActiveUserCount
            detailObj.value[3][0].total= item.activeUserCount
            detailObj.value[3][0].txt[0]= i18n.global.t('position.d69',{peNum:item.activeUserCount})
        }
      })
  })
}
getUserInfoSteep()


const getCurrentUser = (current:any)=>{
  if(current==0){
    currentIndex.value = 0
  }
  else if(current==1){
    currentIndex.value = 0
  }
  else if(current==2){
    currentIndex.value = 0
  }
  else if(current==3){
    currentIndex.value = 1
  }
  else if(current==4){
    currentIndex.value = 2
  }
  else if(current==5){
    currentIndex.value = 3
  }
}

const showPeople = ref<boolean>(false)
const peopleList = ref<any>([])
const titleText = ref<string>('')
const getLevel = (index: any) => {
  if (currentIndex.value != 0 && index == 0 && detailObj.value[currentIndex.value][0].speed > 0) {
    peopleList.value = []
    let id:any
    if (currentIndex.value == 1) {
      titleText.value = getPositon.value['2']
      id = 3
    }
    if (currentIndex.value == 2) {
      titleText.value = getPositon.value['3']
      id = 4
    }
    if (currentIndex.value == 3) {
      titleText.value = getPositon.value['4']
      id = 5
    }
    showPeople.value = true
    proxy.$api.getLevel(id).then((res: any) => {
      if (res.code != 200) return
      peopleList.value = res.data
    }) 
  }
}

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});
    
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>