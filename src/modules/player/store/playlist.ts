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
		const playlists = useStorage<Playlists>('playlists', {
			favorite: getSongs(),
			recent: [],
		})
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
		addTrackToPlaylist(name: string, track: Track) {
			const exist = this.playlists[name]?.some((i) => i.id === track.id)

			if (!exist) {
				this.playlists[name]?.push(track)
				return true
			}

			return false
		},
		removeTrackFromPlaylist(name: string, index: number) {
			this.playlists[name]?.splice(index, 1)
		},
		// LATER: reorder
	},
})
