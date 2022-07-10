import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import PlaylistPage from './modules/playlist/view.vue'
import PlayerPage from './modules/player/view.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'Home',
		component: PlaylistPage,
	},
	{
		path: '/player',
		name: 'Player',
		component: PlayerPage,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
