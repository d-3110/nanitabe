import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBurger, faRightFromBracket, faCheck, faUtensils, faCirclePlus, faClockRotateLeft, faBellConcierge } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {

  config.autoAddCss = false
  library.add(faGithub, faBurger, faRightFromBracket, faCheck, faUtensils, faCirclePlus, faClockRotateLeft, faBellConcierge)
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})