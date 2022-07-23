import { getUnixTime } from 'date-fns'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { fetchStreamUrl } from '@/utils/bandcamp'
import { usePlayerState } from './player'

const CACHE_TTL = 3600

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

export type StreamUrls = {
	[key: string]: {
		url: string
		ttl: number
	}
}

export const usePlaylistState = defineStore('playlist', {
	state: () => {
		const _streamUrlCaches = useStorage<StreamUrls>('streamurls', {})
		const playlists = useStorage<Playlists>('playlists', {
			favorite: [],
			recent: [],
		})
		const key = useStorage('activePlaylist', 'favorite')
		const index = useStorage('currentIndex', 0)

		return {
			_streamUrlCaches,
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
			const player = usePlayerState()
			const exist = this.playlists[name]?.some((i) => i.id === track.id)

			if (exist) return false

			// Add item
			this.playlists[name]?.push(track)

			// Handle first track added
			this.playlists[name]?.length === 1 && player.setTrack(name, 0)

			return true
		},
		removeTrackFromPlaylist(name: string, index: number) {
			const player = usePlayerState()

			// Remove item
			this.playlists[name]?.splice(index, 1)

			// Adjust track if index is bigger than current index
			this.index > index && (this.index -= 1)
			// Reset index to 0 if index is final
			this.index >= this.playlists[name]?.length && (this.index = 0)
			// Handle last track deleted
			!this.currentTrack && (player.playing = false)
		},
		async getStreamUrl(url: string) {
			const unixTime = getUnixTime(new Date())
			const item = this._streamUrlCaches[url]

			if (!item || item.ttl < unixTime) {
				this._streamUrlCaches[url] = {
					url: await fetchStreamUrl(url),
					ttl: unixTime + CACHE_TTL,
				}
			}

			return this._streamUrlCaches[url].url
		},
		// LATER: reorder
	},
})
