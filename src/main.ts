import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'
import { VueQueryPlugin } from 'vue-query'
import App from './App.vue'
import router from './router'

/* Core CSS required for Ionic components to work properly */
import 'virtual:windi.css'
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'

const pinia = createPinia()
const app = createApp(App)
	.use(IonicVue, {
		swipeBackEnabled: false,
		mode: 'ios',
	})
	.use(VueQueryPlugin)
	.use(pinia)
	.use(router)

router.isReady().then(() => {
	app.mount('#app')
})
