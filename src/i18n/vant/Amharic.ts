export default {
  name: 'ስም',
  tel: 'የስልክ ቁጥር',
  save: 'ያስቀምጥ',
  clear: 'አጽዳ',
  cancel: 'ይቅርታ',
  confirm: 'አረጋግጥ',
  delete: 'ሰርዝ',
  loading: 'በመጫን... ',
  noCoupon: 'አይነት ኮፕን የለም',
  nameEmpty: 'እባክዎ ስም ይሙሉ',
  addContact: 'የግንኙነት ተጨማሪ',
  telInvalid: 'የስልክ ቁጥር ወቅታዊ አይደለም',
  vanCalendar: {
    end: 'መጨረሻ',
    start: 'መጀመር',
    title: 'መዝገብ',
    weekdays: ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `እባክዎ ከ ${maxRange} ቀን በላይ ይምረጡ`
  },
  vanCascader: {
    select: 'ይምረጡ'
  },
  vanPagination: {
    prev: 'ወቅታዊ',
    next: 'ቀጣይ'
  },
  vanPullRefresh: {
    pulling: 'እባክዎ ወደ ላይ ቀይር...',
    loosing: 'ወደ ታች ይቀይሩ...'
  },
  vanSubmitBar: {
    label: 'ጠቅላላ:'
  },
  vanCoupon: {
    unlimited: 'ወይም',
    discount: (discount: number) => `${discount * 10}% ቅናሽ`,
    condition: (condition: number) => `ቢያንስ ${condition}`
  },
  vanCouponCell: {
    title: 'ኮፕን',
    count: (count: number) => `እንደዚህ በዝ አንድ ኮፕን አለዎት ${count}`
  },
  vanCouponList: {
    exchange: 'ለውጥ',
    close: 'ዝጋ',
    enable: 'ይገኛል',
    disabled: 'የማይገኝ',
    placeholder: 'ኮፕን ኮድ'
  },
  vanAddressEdit: {
    area: 'አካባቢ',
    areaEmpty: 'የተቀበዩ አካባቢ እባክዎ ይምረጡ',
    addressEmpty: 'አድራሻ አይቀር',
    addressDetail: 'አድራሻ',
    defaultAddress: 'እንደ አማራጭ አድራሻ ይመርጡ'
  },
  vanAddressList: {
    add: 'አዲስ አድራሻ ይጨምሩ'
  }
}
