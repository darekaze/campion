import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

// TEMP: songs
import { getSongs } from '@/utils/initial-data'

export type Track = {
	id: number
	art_id: number
	title: string
	artist: string
	album: string
	url: string
}

export type Playlists = {
	[key: string]: Track[]
}

export const usePlaylistState = defineStore('playlist', {
	state: () => {
		// TEMP: initial data for testing
		const playlists = useStorage<Playlists>('playlists', { favorite: getSongs() })
		const key = useStorage('activeKey', '')
		const index = useStorage('currentIndex', 0)

		return {
			playlists,
			key,
			index,
		}
	},
	getters: {
		currentPlaylist: ({ playlists, key }) => playlists[key],
		currentTrack: ({ playlists, key, index }) => playlists[key]?.[index],
		getPlaylist: ({ playlists }) => {
			return (name: string) => playlists[name] ?? []
		},
	},
	actions: {
		// TODO: impl. playlist actions
		// https://pinia.vuejs.org/core-concepts/state.html#mutating-the-state
		// addItemToPlayList
	},
})
