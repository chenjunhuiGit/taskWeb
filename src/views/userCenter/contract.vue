<template>
  <div class="contract" >
    <div class="contract-text" ref="mykk">
    <div class="title">{{ $t('userCenter.d07') }}</div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d08') }}</span>
        <span class="item-txt">{{gonTractInfo.contractCode}}</span>
    </div>
    <div class="contract-item mar-bottom20">
        <span class="item-title">{{ $t('userCenter.d09') }}</span>
        <span class="item-txt">{{gonTractInfo.signTime}}</span>
    </div>
    <div class="contract-top mar-bottom40">

        <div class="contract-left">
            <div class="contract-item mar-bottom20">
                <span class="item-title">{{ $t('userCenter.d10') }}</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d11') }}</span>
                <span class="item-txt">CaptchaExpert LLC</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d12') }}</span>
                <span class="item-txt">{{ $t('userCenter.d81') }}</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d13') }}</span>
                <span class="item-txt">www.captchajob.com</span>
            </div>
            <div class="contract-item mar-bottom40">
                <span class="item-title">{{ $t('userCenter.d14') }}</span>
                <span class="item-txt">support@captchajob.com</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d15') }}</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d16') }}</span>
                <span class="item-txt">{{gonTractInfo.userName}}</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d17') }}</span>
                <span class="item-txt">{{gonTractInfo.account}}</span>
            </div>
            <div class="contract-item">
                <span class="item-title">{{ $t('userCenter.d18') }}</span>
                <span class="item-txt">{{gonTractInfo.email}}</span>
            </div>
        </div>
        <div class="contract-right">
            <img src="@/assets/cexp1.png" alt="">
        </div>
    
    </div>
    <div class="contract-item mar-bottom20">
        <span class="item-title title-blo">{{ $t('userCenter.d19') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d20') }}</span>
        <span class="item-txt">{{ $t('userCenter.d21') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d22') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item mar-bottom20">
        <p class="item-info">{{ $t('userCenter.d23') }}</p>
        <p class="item-info">{{ $t('userCenter.d24') }}</p>
        <p class="item-info">{{ $t('userCenter.d25') }}</p>
        <p class="item-info">{{ $t('userCenter.d26') }}
        </p>
    </div>
    <!-- <div class="contract-item"></div> -->
    <div class="contract-item ">
        <span class="item-title title-blo">{{ $t('userCenter.d27') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item ">
        <span class="item-title">2.1 </span>
        <span class="item-txt">{{ $t('userCenter.d28') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">2.2</span>
        <span class="item-txt">{{ $t('userCenter.d29') }}</span>
    </div>
    <div class="contract-item ">
        <span class="item-title">2.3</span>
        <span class="item-txt">{{ $t('userCenter.d30') }}</span>
    </div>
    
    <div class="contract-item ">
        <span class="item-title">2.4</span>
        <span class="item-txt">{{ $t('userCenter.d31') }}</span>
    </div>
    <div class="contract-item ">
        <span class="item-title">{{ $t('userCenter.d32') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item mar-bottom20" >
        <p class="item-info">{{ $t('userCenter.d33') }}</p>
        <p class="item-info">{{ $t('userCenter.d34') }}</p>
    </div>
    <div class="contract-item ">
        <span class="item-title title-blo">{{ $t('userCenter.d35') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d36') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item">
        <p class="item-info">{{ $t('userCenter.d37') }}</p>
        <p class="item-info">{{ $t('userCenter.d38') }}</p>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d39') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item">
        <p class="item-info">{{ $t('userCenter.d40') }}</p>
        <p class="item-info">{{ $t('userCenter.d41') }}</p>
        <p class="item-info">{{ $t('userCenter.d42') }}</p>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d43') }}</span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item mar-bottom20">
        <p class="item-info">{{ $t('userCenter.d44') }}</p>
    </div>
    <div class="contract-item">
        <span class="item-title  title-blo">{{ $t('userCenter.d45') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">4.1 </span>
        <span class="item-txt">{{ $t('userCenter.d46') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d47') }} </span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item">
        <p class="item-info">{{ $t('userCenter.d48') }}</p>
        <p class="item-info">{{ $t('userCenter.d49') }}</p>
        <p class="item-info">{{ $t('userCenter.d50') }}</p>
        <p class="item-info">{{ $t('userCenter.d51') }}</p>
        <p class="item-info">{{ $t('userCenter.d52') }}</p>
        <p class="item-info">{{ $t('userCenter.d53') }}</p>
        <p class="item-info">{{ $t('userCenter.d54') }}</p>
        <!-- <p class="item-info">{{ $t('userCenter.d55') }}</p> -->
        <!-- <p class="item-info">• 提交错误答案的 CAPTCHA 任务将失去该单个任务的收入；</p>
        <p class="item-info">• 警告或终止合同（视情节严重程度）。</p> -->
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d55') }} </span>
        <!-- <span class="item-txt"></span> -->
    </div>
    <div class="contract-item mar-bottom20">
        <p class="item-info">{{ $t('userCenter.d56') }}</p>
        <p class="item-info">{{ $t('userCenter.d57') }}</p>
        <p class="item-info">{{ $t('userCenter.d58') }}</p>
    </div>
    <div class="contract-item ">
        <span class="item-title  title-blo">{{ $t('userCenter.d59') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">5.1 </span>
        <span class="item-txt">{{ $t('userCenter.d60') }}</span>
    </div>
    <div class="contract-item mar-bottom20">
        <span class="item-title">5.2 </span>
        <span class="item-txt">{{ $t('userCenter.d61') }}</span>
    </div>
    <div class="contract-item ">
        <span class="item-title  title-blo">{{ $t('userCenter.d62') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">6.1 </span>
        <span class="item-txt">{{ $t('userCenter.d63',{timeS:gonTractInfo.signTime ,timeE:gonTractInfo.endTime }) }}</span>
    </div>
    <div class="contract-item mar-bottom20">
        <span class="item-title">6.2 </span>
        <span class="item-txt">{{ $t('userCenter.d66') }}</span>
    </div>
    <div class="contract-item ">
        <span class="item-title  title-blo">{{ $t('userCenter.d67') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">7.1 </span>
        <span class="item-txt">{{ $t('userCenter.d68') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">7.2 </span>
        <span class="item-txt">{{ $t('userCenter.d69') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">7.3 </span>
        <span class="item-txt">{{ $t('userCenter.d70') }}</span>
    </div>
    <div class="contract-item mar-bottom60">
        <span class="item-title">{{ $t('userCenter.d71') }}</span>
        <!-- <span class="item-txt"></span> -->
        <p class="item-info">{{ $t('userCenter.d72') }}</p>
        <p class="item-info">{{ $t('userCenter.d73') }}</p>
        <p class="item-info">{{ $t('userCenter.d74') }}</p>
    </div>
    <div class="contract-item">
        <span class="item-title  title-blo">{{ $t('userCenter.d75') }}</span>
    </div>
    <div class="contract-item mar-bottom60">
        <span class="item-title  title-blo">{{ $t('userCenter.d82') }}</span>
    </div>
    <div class="contract-b-img">
        <img src="@/assets/cexp2.png" alt="">
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d76') }}</span>
        <span class="item-txt"> CaptchaExpert LLC</span>
    </div>
    <div class="contract-item mar-bottom60">
        <span class="item-title">{{ $t('userCenter.d77') }}</span>
        <span class="item-txt"> {{gonTractInfo.signTime}}</span>
    </div>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d78') }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d79') }}</span>
        <span class="item-txt bor">{{ gonTractInfo.status!=1?'':gonTractInfo.userName }}</span>
    </div>
    <div class="contract-item mar-bottom60">
        <span class="item-title">{{ $t('userCenter.d77') }} </span>
        <span class="item-txt"> {{ gonTractInfo.signTime }}</span>
    </div>
    <div class="contract-item">
        <span class="item-title">{{ $t('userCenter.d80') }}</span>
    </div>
</div>
    <div class="btnGrop" >
        <!-- <van-icon name="down" /> -->
        <!-- {{$t('userCenter.d04')}} -->
         <van-button  hairline size="small" :disabled="gonTractInfo.status!=0"  type="primary" @click="toGontractSign">{{ $t('userCenter.d84') }}</van-button>
         <van-button  hairline size="small" :disabled="gonTractInfo.status!=1"  type="primary" @click="toCreatePdf">{{ $t('userCenter.d85') }}</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance ,onMounted,onUnmounted, h} from 'vue'
import { showConfirmDialog ,showDialog} from 'vant';
import i18n from '@/i18n/index'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const { proxy }: any = getCurrentInstance()
defineOptions({
  name: 'contract'
})
// const noTableHeight = ref<any>(0)
const gonTractInfo = ref<any>({})
const mykk = ref(null)
const toCreatePdf = async () => {
    const el = mykk.value
    const offTop = mykk.value.offsetTop 
    const elItem = document.querySelectorAll('.contract-item')
    toPushHeight(el,elItem,offTop)
    html2canvas(el, {
        scale: 4,logging: false        
    }).then((canvas) => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        let ctx = canvas.getContext('2d',{willReadFrequently:true});
        let a4w =  190;
        let a4h =  277;
        let imgHeight = Math.floor(a4h * canvas.width / a4w)
        let renderedHeight = 0
        while (renderedHeight < canvas.height) {
            let page = document.createElement('canvas')
            page.width = canvas.width
            page.height = Math.min(imgHeight, canvas.height - renderedHeight)
            page.getContext('2d',{willReadFrequently:true}).putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
            pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width))
            renderedHeight += imgHeight
            if (renderedHeight < canvas.height) {
                pdf.addPage()
            }
        } 
        let removeList = document.querySelectorAll('.divRemove')
        for (let indexInfo = 0; indexInfo<removeList.length; indexInfo++){
            removeList[indexInfo].remove()
        }
        let fileName = i18n.global.t('userCenter.d07')
        fileName = fileName.replace(/(\r\n|\n|\r)/gm, "")
        pdf.save(fileName+'.pdf')
    })
}

const getInfo = () => {
    proxy.$api.getGontractInfo().then((res: any) => {
        if (res.code !== 200) return
        gonTractInfo.value = res.data || {}
    })
}
getInfo()
const toGontractSign = () => {
    showConfirmDialog({
        title: i18n.global.t('position.c107'),
        message: i18n.global.t('userCenter.d83'),
    }).then(() => {
           const data = {
            userName:gonTractInfo.value.userName,
        }        
        proxy.$api.toGontractSign(data).then((res: any) => {
            if (res.code == '5000034') {
                showDialog({
                    message: i18n.global.t('userCenter.d86'),
                })
                return
            }else if (res.code !== 200) return
            gonTractInfo.value.status = 1
        })
    })
    
}
const toPushHeight = (el,elList,difHeight)=>{
    const pageHeight = Math.floor(277 * el.scrollWidth / 190)
    for (let i = 0; i < elList.length; i++){
        let item = elList[i]
        const multiple = Math.ceil((item.offsetTop-difHeight ) / pageHeight); 
        if (isSplit(item, multiple * pageHeight, difHeight)) {
            let _h = 0
            _h = multiple * pageHeight - (item.offsetTop - difHeight + item.offsetHeight);
            if (item.children.length > 0) {
                foot :for (let k = 0; k < item.children.length; k++){
                    let itemInfo = item.children[k]
                    const m = Math.ceil((itemInfo.offsetTop - difHeight) / pageHeight); 
                    if (isSplit(itemInfo,m * pageHeight, difHeight)) {
                        let ch = 0;
                        ch = itemInfo.offsetHeight
                        let newNode1 = getFooterElement(ch);
                         const divParent1 = itemInfo.parentNode;
                        if (isBlockLevelElement(itemInfo)) {
                            divParent1.insertBefore(newNode1,itemInfo)
                        } else {
                            let status =false
                            while (k > 0) {
                                if (!isBlockLevelElement(item.children[k - 1])) {
                                    k--
                                } else {
                                    status =true
                                    divParent1.insertBefore(newNode1,item.children[k])
                                }
                            }
                            if(!status) divParent1.insertBefore(newNode1, divParent1.firstChild)
                        }
                        break foot;
                    }
                }
            } else {
                let newNode = getFooterElement(_h);
                const divParent = item.parentNode;
                const nextNode = item.nextSibling;
                if (nextNode) {
                    divParent.insertBefore(newNode,nextNode)
                } else {
                    divParent.appendChild(newNode)
                }
            }
            
        }
    }
}

const isSplit = (el,pageHeight,difHeight) => {
    return el.offsetTop-difHeight + el.offsetHeight >= pageHeight  
}
const getFooterElement = (height) => {
    const newNode = document.createElement('div')
    newNode.style.background = '#fff';
    newNode.style.width = 'calc(100% + 8px)';
    newNode.style.marginLeft = '0px';
    newNode.style.marginBottom = '0px';
    newNode.classList.add('divRemove');
    newNode.style.height = height + 'px'
    return newNode
}
function isBlockLevelElement(element) {
  const display = window.getComputedStyle(element).display;
  return display === 'block' || display === 'flex' || display === 'grid' || display === 'inline-block' || display === 'table' || display.startsWith('list-item');
}
</script>
<style lang="scss" scoped>
@import './contract.scss';
</style>