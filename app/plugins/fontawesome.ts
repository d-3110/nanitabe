import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
//以下は個別にアイコンを指定してimportする方法。こちらのほうが軽量で済む。
//{}には使いたいアイコン名を書く
//import { faCirclePlus, faBars } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {

  config.autoAddCss = false
  library.add(fas)
  //個別フォントをimportした場合は以下を使う
  //library.add(faCirclePlus, faBars)
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})