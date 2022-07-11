import { defineStore } from 'pinia'
import { useStorage, useMediaControls, useEventListener } from '@vueuse/core'
import { getSongs, ITrack } from '@/data/songs'
import { formatSongTime } from '@/utils/second-format'

export const useAudioState = defineStore('player', {
	state: () => {
		const playlist = useStorage('playlist', getSongs())
		const currentIndex = useStorage('currentIndex', 0)
		const track = playlist.value[currentIndex.value]

		const _audio = new Audio(track?.url)
		_audio.preload = 'auto'

		const { playing, currentTime, duration } = useMediaControls(_audio)

		if (window.navigator.mediaSession && track) {
			const { title, artist, album, artwork_url } = track
			window.navigator.mediaSession.metadata = new MediaMetadata({
				title,
				artist,
				album,
				artwork: [{ src: artwork_url, sizes: '512x512', type: 'image/jpg' }],
			})
		}

		return {
			_audio,
			playing,
			duration,
			currentTime,
			playlist,
			currentIndex,
		}
	},
	getters: {
		currentTrack: ({ playlist, currentIndex }) => playlist[currentIndex],
		formattedCurrentTime: ({ currentTime }) => formatSongTime(currentTime),
		formattedDuration: ({ duration }) => formatSongTime(duration),
	},
	actions: {
		play() {
			if (!this._audio.src) return

			this._audio.play()
			if (window.navigator.mediaSession) {
				window.navigator.mediaSession.playbackState = 'playing'
			}
		},
		pause() {
			this._audio.pause()
			if (window.navigator.mediaSession) {
				window.navigator.mediaSession.playbackState = 'paused'
			}
		},
		setTrack(track: ITrack, index: number) {
			this._audio.src = track?.url
			this.currentIndex = index

			if (window.navigator.mediaSession) {
				const { title, artist, album, artwork_url } = track
				window.navigator.mediaSession.metadata = new MediaMetadata({
					title,
					artist,
					album,
					artwork: [{ src: artwork_url, sizes: '512x512', type: 'image/jpg' }],
				})
			}
		},
		skipTrack(forward = true) {
			forward ? (this.currentIndex += 1) : (this.currentIndex -= 1)
			let index = this.currentIndex
			let track = this.playlist[index]

			// Handle loop playing
			if (!track) {
				index = forward ? 0 : this.playlist.length - 1
				track = this.playlist[index]
			}

			this.setTrack(track, index)
			this.play()
		},
		seekTo(sec: number) {
			this.currentTime = sec
		},
		// LATER: split playlist as a state
		// LATER: setPlaylist for multiple playlist (recent, favorite...)
		// LATER: addTrack(track) {}
	},
})

export const initAudioHandler = () => {
	const player = useAudioState()

	useEventListener(player._audio, 'ended', () => {
		player.skipTrack()
	})

	if (window.navigator.mediaSession) {
		navigator.mediaSession.setActionHandler('play', async () => player.play())
		navigator.mediaSession.setActionHandler('pause', () => player.pause())
		navigator.mediaSession.setActionHandler('nexttrack', () => player.skipTrack())
		navigator.mediaSession.setActionHandler('previoustrack', () => player.skipTrack(false))
	}
}
