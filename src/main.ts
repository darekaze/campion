import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'
import { initAudioHandler } from './utils/audio-session'
import App from './App.vue'
import router from './router'

/* Core CSS required for Ionic components to work properly */
import './styles/tailwind.css'
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'

/* Theme variables */
import './styles/variables.css'

const pinia = createPinia()
const app = createApp(App)
	.use(IonicVue, {
		swipeBackEnabled: false,
		mode: 'ios',
	})
	.use(pinia)
	.use(router)

initAudioHandler()

router.isReady().then(() => {
	app.mount('#app')
})
