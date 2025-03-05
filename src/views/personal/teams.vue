<template>
  <div class="personal_teams">
    <div class="dataList">
      <div class="tab">
        <div :class="['item',status == 0 ? 'cur':'']" @click="tabClick(0)"><span>{{ $t('position.d11') }}</span></div>
        <div :class="['item',status == 1 ? 'cur':'']" @click="tabClick(1)"><span>{{ $t('position.d13') }}</span></div>
      </div>
      <form action="#" class="seach" :onsubmit='toSeach'>
        <input type="text" v-model="searchInput">
        <div class="img-box" @click="toSeach">
            <img src="@/assets/icon_search.png" alt="">
        </div>        
      </form>
    <div class="search-ul">
        <div :class="['search-item',taskName==item.name?'active':'']" v-for="(item,index) in searchList" :key="index" @click="toSeachByKey(item.name)">
            {{ item.name }}
        </div>
    </div>
    <van-list
        v-model:loading="isLoading"
        :finished="isFinished"
        :finished-text="$t('page.Nodata')"
        offset="50"
        @load="getList"
        >
        <div class="user-item" v-for="(item,index) in dataList" :key="index">
            <div class="item-position">{{getPositon[item.level]}}</div>
            <div class="item-top">
                <div class="userImg" v-if="item.avatar">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="userImg" v-else>
                  <img src="@/assets/user1.png" alt="">
                </div>
                <div class="item-name">
                    <div class="name" v-if="item.firstName || item.lastName">{{ item.firstName + item.lastName }}</div>
                    <div class="name" v-else>{{ item.account }}</div>
                    <div class="id-card">{{item.phone}}</div>
                </div>
            </div>
            <div class="item-line"></div>
            <div class="item-bottom">
                <div class="item-bo-left">
                    <div class="item-n">{{item.taskName||$t('position.s94')}}</div>
                    <div class="item-s">{{$t('position.c003')}}</div>
                </div>
                <div class="item-bo-right">
                    <div class="item-n">{{item.answerRightRate || 0}}%</div>
                    <div class="item-s">{{$t('position.c088')}}</div>
                </div>
            </div>
        </div>
    </van-list>      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import { useCounterStore } from '@/store/useCounterStore'
import { storeToRefs } from 'pinia'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal_teams'
})
const userStore = useCounterStore()
const { getPositon } =  storeToRefs(userStore)
const dataList = ref([])
const status = ref<number>(0)
const searchInput =ref('')
const searchList = ref([])
const taskName = ref('')
let page = {
  pageSize: 10,
  pageNum: 1,
  status: 0,
  account:'',
  userName:'',
  taskName:'',
}
const isLoading =ref(false) 
const isFinished =ref(false)
const getList = () => {
  page.status = status.value  
  page.account = searchInput.value
  page.userName = searchInput.value
  page.taskName = taskName.value
  isFinished.value = false
  isLoading.value = true
  proxy.$api.myteamMembers(page).then((res: any) => {
    isLoading.value = false
    if (res.code !== 200) {
        isFinished.value = true
        return
    }
    let list = res.data&&res.data.records || []
    dataList.value.push(...list) 
    page.pageNum = res.data.current+1
    if(res.data.size*res.data.current >= res.data.total){
        isFinished.value = res.data.size*res.data.current >= res.data.total
        page.pageNum = res.data.current
    }
  }).catch(()=>{
     isLoading.value = false
     isFinished.value = true
  })
}

const tabClick = (cur: number) => {
  status.value = cur
  page.status = cur
  taskName.value = ''
  page.pageNum = 1
  searchInput.value = ''
  dataList.value =[]
  getList()
}
const toSeach = (e)=>{
    e.preventDefault();
    page.pageNum = 1
    taskName.value = ''
    dataList.value =[]
    getList()
}
const toSeachByKey = (name: string) => {
    taskName.value = taskName.value==name?'':name
    page.pageNum = 1
    dataList.value =[]
    getList()
}
const taskAll = () => {
  proxy.$api.taskAll().then((res: any) => {
      if(res.code==200){
        searchList.value= res.data ||[]
      }
  })
}
taskAll()
</script>
<style lang="scss" scoped>
@import './teams.scss';
</style>
