import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from './utils/tabs.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/t/playlist',
	},
	{
		path: '/t/',
		component: TabsPage,
		children: [
			{
				path: '',
				redirect: '/t/playlist',
			},
			{
				path: 'playlist',
				name: 'Playlist',
				component: () => import('@/modules/playlist/index.vue'),
			},
			{
				path: 'search',
				name: 'Search',
				component: () => import('@/modules/search/index.vue'),
			},
			{
				path: 'recent',
				name: 'Recent Playlist',
				component: () => import('@/modules/playlist/recent.vue'),
			},
		],
	},
	{
		path: '/player',
		name: 'Player',
		component: () => import('@/modules/player/view.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
