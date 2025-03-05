import { defineStore } from 'pinia'
import i18n from '@/i18n/index'
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    getPositon: (state) => {
      return {  // master 普通员工 兼职员工 全职员工  指挥官 团队运营者 运营总监
        0:i18n.global.t('position.d1'), //普通员工
        1:i18n.global.t('position.d7'),//'兼职员工', 
        2:i18n.global.t('position.d9'),//'全职员工',
        3:i18n.global.t('position.d23'),//'指挥官',
        4:i18n.global.t('position.d42'),//'团队运营者',
        5:i18n.global.t('position.d67'),//'运营总监'
      }
    }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
