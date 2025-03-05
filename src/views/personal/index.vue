<template>
  <div>
    <div class="personal">
      <div class="pubBg index1">
        <div class="indexTit">
          <div class="left">
            <img src="@/assets/icon06.png" />
            <b>{{ $t('personal.Myassets') }}</b>
          </div>
          <router-link to="/personal/assets">{{ $t('personal.Viewassetrecords') }}<van-icon name="arrow" /></router-link>
        </div>
        <div class="br2">
          <div class="p">
            {{ $t('personal.d6') }}<span>{{ info.wallet.amount || 0 }} USDT</span>
          </div>
          <div class="btnBox">
            <div class="pubBtn" @click="showPop">{{ $t('personal.d7') }}</div>
            <div class="pubBtn2" @click="goWithdraw">{{ $t('personal.Withdraw') }}</div>
          </div>
        </div>
        <div class="ul">
          <div class="li">
            <div class="label">{{ $t('withdraw.Walletaddress') }}</div>
            <router-link to="/personal/wallet_address">{{ $t('personal.Editwalletaddress') }}</router-link>
          </div>
          <div class="li">
            <div class="label">{{ $t('new.d16') }}</div>
            <router-link to="/personal/password" v-if="info.wallet.password">{{ $t('new.d17') }}</router-link>
            <router-link to="/personal/password" v-else>{{ $t('new.d21') }}</router-link>
          </div>
        </div>
      </div>
      <div class="pubBg index2">
        <div class="indexTit">
          <div class="left">
            <img src="@/assets/icon11.png" />
            <b>{{ $t('router.identity') }}</b>
          </div>
          <router-link v-if="info.user.authStatus == 1" to="/personal/identity">{{ $t('personal.d12') }}</router-link>
          <router-link v-if="info.user.authStatus == 2" to="/personal/identity">{{ $t('personal.d13') }}</router-link>
          <router-link v-if="info.user.authStatus == 0 || info.user.authStatus == 3" to="/personal/identity">{{ $t('personal.d14') }}<van-icon name="arrow" /></router-link>
        </div>
      </div>

      <div class="pubBg index2">
        <div class="indexTit">
          <div class="left">
            <b>{{ $t('c2c.d46') }}</b>
          </div>
          <a href="javascript:void(0)" @click="setPay()">{{ $t('c2c.d101') }}</a>
        </div>
        <div class="ul">
          <div class="li" v-for="item in payList2">
            <div class="label">
              {{ item.label }}
              <div class="p">{{ item.accountName }}</div>
              <div class="p">{{ item.account }}</div>
            </div>
            <a href="javascript:void(0)" @click="updatePay(item)">{{ $t('new.d17') }}</a>
          </div>
        </div>
      </div>

      <div class="pubBg index2">
        <div class="indexTit">
          <div class="left">
            <img src="@/assets/icon12.png" />
            <b>{{ $t('personal.d5') }}</b>
          </div>
          <a href="javascript:void(0)" v-if="!isEdit" @click="edit">{{ $t('personal.Editpersonalinformation') }}</a>
        </div>
        <div class="ul" v-if="!isEdit">
          <div class="li">
            <div class="label">{{ $t('personal.Name') }}</div>
            <span>{{ info.user.firstName }}</span>
          </div>
          <div class="li">
            <div class="label">{{ $t('personal.Lastname') }}</div>
            <span>{{ info.user.lastName }}</span>
          </div>
          <div class="li">
            <div class="label">{{ $t('personal.Phonenumber') }}</div>
            <span>+{{ info.user.zone }} {{ info.user.phone }}</span>
          </div>
        </div>
        <div class="form" v-else>
          <div class="item">
            <div class="label">{{ $t('personal.Name') }}</div>
            <div class="right">
              <input type="text" v-model="info.user.firstName" />
            </div>
          </div>
          <div class="item">
            <div class="label">{{ $t('personal.Lastname') }}</div>
            <div class="right">
              <input type="text" v-model="info.user.lastName" />
            </div>
          </div>
          <div class="item">
            <div class="label">{{ $t('personal.Phonenumber') }}</div>
            <div class="right">
              <div class="code">
                <span style="color: #9ba5b8;">+{{ info.user.zone }}</span>
                <!-- <van-icon name="play" /> -->
              </div>
              <input type="text" readonly v-model="info.user.phone" style="color: #9ba5b8;" />
            </div>
          </div>
          <div class="btnBox">
            <div class="pubBtn" @click="updateUserInfo">{{ $t('personal.Save') }}</div>
            <div class="pubBtn2" @click="cancelSave">{{ $t('personal.Cancel') }}</div>
          </div>
        </div>
      </div>
      <div class="pubBg index2">
        <div class="indexTit">
          <div class="left">
            <img src="@/assets/icon13.png" />
            <b>{{ $t('personal.Accountinformation') }}</b>
          </div>
        </div>
        <div class="ul">
          <div class="li">
            <div class="label">{{ $t('personal.Mail') }}</div>
            <span v-if="info.user.email">{{ info.user.email }}</span>
            <router-link v-else to="/personal/email"> {{ $t('home.Gotoadd') }}<van-icon name="arrow" /> </router-link>
          </div>
          <div class="li">
            <div class="label">{{ $t('personal.d1') }}</div>
            <span>{{ info.user.parentEmail }}</span>
            <a href="javascript:void(0)" @click="checkPhone">{{ $t('personal.d2') }}</a>
          </div>
          <div class="li">
            <div class="label">{{ $t('personal.d3') }}</div>
            <span>{{ info.inviteCode }}</span>
            <a href="javascript:void(0)" @click="copy(info.inviteCode)">{{ $t('home.copy') }}</a>
          </div>
          <div class="li">
            <div class="label">{{ $t('personal.d4') }}</div>
            <span>{{ info.user.levelLabel }}</span>
          </div>
          <div class="li">
            <div class="label">{{ $t('new.d15') }}</div>
            <router-link to="/personal/password">{{ $t('new.d17') }}</router-link>
          </div>
        </div>
      </div>
      <div class="fixedBot">
        <a href="https://t.me/CaptchaExpertCEXP">
          <img src="@/assets/icon14.png" />
          <span>{{ $t('personal.Addressbook') }}</span>
        </a>
        <router-link to="/personal/customer" class="pubBtn">
          <img src="@/assets/icon15.png" />
          <span>{{ $t('personal.ContactCustomerService') }}</span>
        </router-link>
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

    <van-dialog v-model:show="showPayType" :title="payLabel" showCancelButton :before-close="submitPay">
      <div class="c2cForm">
        <div class="item" v-if="!isUpdate">
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

    <van-popup v-model:show="showArea" :style="{ height: '80%' }" closeable close-icon="close" round position="bottom">
      <div class="phoneArea">
        <div class="tit">{{ $t('register.zone2') }}</div>
        <input type="text" v-model="searchKey" @input="search" :placeholder="$t('new.d2')" />
        <div class="list">
          <div :class="info.user.zone == item.code ? 'item cur' : 'item'" v-for="item in areaList" @click="areaClick(item.code)">
            <div class="name">{{ item.name }}</div>
            <div class="code">+{{ item.code }}</div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-dialog v-model:show="show" :title="$t('personal.d7')" :confirm-button-text="$t('personal.d8')" :before-close="sunbmit" show-cancel-button>
      <div class="dialog-lv">
        <div class="content">
          <div class="p">
            <div class="label">{{ $t('home.Uniquepaymentaddress') }}</div>
          </div>
          <div class="wallet">
            <div class="span">{{ payAddress0 }}</div>
            <div class="copy" @click="copy(payAddress0)">{{ $t('home.copy') }}</div>
          </div>
          <div class="p">
            <div class="label">{{ $t('personal.d9') }}(USDT)</div>
            <div class="span"><input type="text" v-model="amount" @input="validateInput" :placeholder="$t('personal.Pleaseenter')" /></div>
          </div>
          <div class="p">
            <div class="label">TXID</div>
            <div class="span"><input type="text" v-model="txid" :placeholder="$t('personal.d16')" /></div>
          </div>
          <div class="p">
            <div class="label">{{ $t('personal.d18') }}</div>
            <van-uploader v-model="fileList" max-count="1" :after-read="afterRead" />
          </div>
          <div class="p"></div>
          <!-- <div class="p">
            <div class="label">{{ $t('home.Paymentaddress') }}</div>
          </div>
          <div class="wallet">
            <div class="span" v-if="payAddress">{{ payAddress }}</div>
            <router-link to="/personal/wallet" v-else>{{ $t('home.Gotoadd') }}</router-link>
          </div>
          <div class="time">
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
import { showToast, showDialog, showConfirmDialog } from 'vant'
import { ref, reactive, getCurrentInstance } from 'vue'
import { clipboard, Countdown, maskEmail } from '@/utils/common'
import { areaCode, searchItems } from '@/utils/areaCode'
import { useRouter } from 'vue-router'
import { isRequired } from '@/utils/validators'
import i18n from '@/i18n/index'
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'personal'
})

const showPayType = ref<boolean>(false)
const showPay = ref<boolean>(false)
const payList = ref<any>([])
const payList2 = ref<any>([])
const payLabel = ref<string>('')
const updatePayId = ref<string>('')
const account = ref<string>('')
const accountName = ref<string>('')
const payPassword = ref<string>('')
const isUpdate = ref<boolean>(false)
const paymentType = ref<any>('')
const payTypeLabel = ref<string>('')
const tradeAccountList = () => {
  proxy.$api.tradeAccountList().then((res: any) => {
    if (res.code !== 200) return
    payList2.value = res.data
  })
}
tradeAccountList()
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
const payTypeClick = (item: any) => {
  for (let i = 0; i < payList.value.length; i++) {
    if (item.value == payList.value[i].value) {
      payList.value[i].checked = true
    } else {
      payList.value[i].checked = false
    }
  }
}
const getPayType = () => {
  proxy.$api.walletPayTypes().then((res: any) => {
    if (res.code !== 200) return
    payList.value = res.data
  })
}

const setPay = () => {
  payLabel.value = i18n.global.t('c2c.d101')
  isUpdate.value = false
  showPayType.value = true
  account.value = ''
  accountName.value = ''
  getPayType()
}
const updatePay = (item: any) => {
  if (!info.wallet.password) {
    showToast(i18n.global.t('c2c.d141'))
    return
  }
  updatePayId.value = item.id
  payLabel.value = item.label
  paymentType.value = item.type
  account.value = item.account
  accountName.value = item.accountName

  isUpdate.value = true
  showPayType.value = true
  payPassword.value = ''
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
          showPayType.value = false
          tradeAccountList()
        })
      } else {
        proxy.$api.accountAdd(json).then((res: any) => {
          if (res.code !== 200) return
          showPayType.value = false
          tradeAccountList()
        })
      }
    })
  } else {
    showPayType.value = false
  }
}

const showArea = ref<boolean>(false)
const areaList = ref<any>([])
const searchKey = ref<string>('')
areaList.value = areaCode
const search = () => {
  if (searchKey.value) {
    areaList.value = searchItems(searchKey.value)
  } else {
    areaList.value = areaCode
  }
}
const areaShow = () => {
  if (!isEdit.value) return
  showArea.value = true
}
const areaClick = (val: string) => {
  showArea.value = false
  info.user.zone = val
}

const info = reactive<any>({
  user: {},
  wallet: {},
  inviteCode: ''
})
let oldUser = {}
proxy.$api.userInfo().then((res: any) => {
  if (res.code !== 200) return
  res.data.parentEmail = res.data.parentEmail ? maskEmail(res.data.parentEmail) : res.data.parentEmail
  info.user = res.data
  oldUser = JSON.parse(JSON.stringify(res.data))
  info.inviteCode = window.location.origin + '/#/register?inviteCode=' + info.user.inviteCode
})
proxy.$api.walletInfo().then((res: any) => {
  if (res.code !== 200) return
  info.wallet = res.data
})

const updateUserInfo = () => {
  const json = {
    firstName: info.user.firstName,
    lastName: info.user.lastName,
    zone: info.user.zone,
    phone: info.user.phone
  }
  proxy.$api.profileUpdate(json).then((res: any) => {
    if (res.code !== 200) return
    showToast(i18n.global.t('forget.Successfullymodified'))
    isEdit.value = false
  })
}

const router = useRouter()

const isEdit = ref<boolean>(false)
const edit = () => {
  isEdit.value = true
}
const cancelSave = () => {
  isEdit.value = false
  info.user = JSON.parse(JSON.stringify(oldUser))
}

const copy = (key: any) => {
  clipboard(key) ? showToast(i18n.global.t('home.Copiedsuccessfully')) : showToast(i18n.global.t('home.Copyfailed'))
}

const checkPhone = () => {
  if (info.user.parentPhone) {
    showDialog({
      message: info.user.parentPhone,
      confirmButtonText: i18n.global.t('home.copy'),
      closeOnClickOverlay: true
    }).then(() => {
      copy(info.user.parentPhone)
    })
  } else {
    showToast(i18n.global.t('page.Nodata'))
  }
}

const show = ref<boolean>(false)
const amount = ref<any>('')
const payAddress0 = ref<string>('')
const payAddress = ref<string>('')
const txid = ref<string>('')

const validateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  // 如果输入值小于等于0，则将其清空或设为1（根据需求调整）
  if (!/^\d*\.?\d*$/.test(value) || parseFloat(value) <= 0) {
    amount.value = ''
  } else {
    amount.value = value
  }
}

// 图片上传
const fileList = ref<any>([])
const afterRead = (file: any) => {
  file.status = 'uploading'
  proxy.$api.imgUpload({ type: 3, file: file.file }).then((res: any) => {
    if (res.code !== 200) {
      file.status = 'failed'
      return
    }
    file.url = res.data
    file.status = 'done'
  })
}

const showPop = () => {
  if (info.user.authStatus != 2) {
    showToast(i18n.global.t('personal.d15'))
    return
  }
  show.value = true
  // timer.reset()
  // timer.start()
  proxy.$api.varGet('biz.trc.address').then((res: any) => {
    if (res.code !== 200) return
    payAddress0.value = res.data.value
  })
  // proxy.$api.walletInfo().then((res: any) => {
  //   if (res.code !== 200) return
  //   payAddress.value = res.data.address
  // })
}
const sunbmit = (action, done) => {
  // 点击了确定按钮
  if (action === 'confirm') {
    if (!amount.value) {
      showToast(i18n.global.t('personal.d11'))
      return
    }
    if (!txid.value) {
      showToast(i18n.global.t('personal.d16'))
      return
    }
    let json = {
      amount: amount.value,
      trxId: txid.value,
      images: []
    }
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].url) json.images[i] = fileList.value[i].url
    }
    if (json.images.length == 0) {
      showToast(i18n.global.t('personal.d17'))
      return
    }
    proxy.$api.walletTopUp(json).then((res: any) => {
      if (res.code !== 200) return
      showToast(i18n.global.t('personal.d10'))
      show.value = false
      info.wallet = res.data
    })
  } else {
    show.value = false
  }
}
const goWithdraw = () => {
  if (info.user.authStatus != 2) {
    showToast(i18n.global.t('personal.d15'))
    return
  }
  router.push('/personal/withdraw?type=1')
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
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
