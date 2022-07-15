import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from './modules/songlist/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/t/library',
	},
	{
		path: '/t/',
		component: TabsPage,
		children: [
			{
				path: '',
				redirect: '/t/library',
			},
			{
				path: 'library',
				name: 'Library',
				component: () => import('@/modules/songlist/library.vue'),
			},
			{
				path: 'search',
				name: 'Search',
				component: () => import('@/modules/search/index.vue'),
			},
			{
				path: 'recent',
				name: 'Recent Playlist',
				component: () => import('@/modules/songlist/recent.vue'),
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
