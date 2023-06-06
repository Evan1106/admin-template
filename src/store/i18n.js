import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 自訂語言檔
import en from '../i18n/en/lang'
import tw from '../i18n/tw/lang'

// 使用插件
Vue.use(VueI18n)

// 取得預設語系
const locale = localStorage.getItem('locale') || 'tw'

// 建立 VueI18n 實體
const i18n = new VueI18n({
  locale,
  messages: { en, tw }
})

export default i18n