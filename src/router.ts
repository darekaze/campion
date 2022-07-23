import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from './modules/tab/container.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/t/home',
	},
	{
		path: '/t/',
		component: TabsPage,
		children: [
			{
				path: '',
				redirect: '/t/home',
			},
			{
				path: 'home',
				name: 'Home',
				component: () => import('@/modules/playlist/index.vue'),
			},
			{
				path: 'search',
				name: 'Search',
				component: () => import('@/modules/search/index.vue'),
			},
		],
	},
	{
		path: '/player',
		name: 'Player',
		component: () => import('@/modules/player/index.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
