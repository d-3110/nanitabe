import lodash from 'lodash'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      _: lodash
    }
  }
})