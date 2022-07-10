import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSongs, ITrack } from '@/data/songs'
import { formatSongTime } from '@/utils/second-format'

export const useAudioState = defineStore('player', {
	state: () => {
		const playlist = getSongs()

		const _audio = new Audio(playlist[0]?.url)
		const currentTime = ref(0)
		const duration = ref(0)

		_audio.preload = 'auto'
		_audio.addEventListener('timeupdate', () => {
			currentTime.value = Math.floor(_audio.currentTime)
		})
		_audio.addEventListener('durationchange', () => {
			duration.value = Math.floor(_audio.duration)
		})

		return {
			_audio,
			playlist,
			duration,
			currentTime,
			currentIndex: 0,
			playing: false,
		}
	},
	getters: {
		currentTrack: ({ playlist, currentIndex }) => playlist[currentIndex],
		formattedCurrentTime: ({ currentTime }) => formatSongTime(currentTime),
		formattedDuration: ({ duration }) => formatSongTime(duration),
	},
	actions: {
		async play() {
			if (!this._audio.src) return

			await this._audio.play()
			this.playing = true
			if (window.navigator.mediaSession) {
				window.navigator.mediaSession.playbackState = 'playing'
			}
		},
		pause() {
			this._audio.pause()
			this.playing = false
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
			this._audio.currentTime = sec
			this.currentTime = sec
		},
		// LATER: setPlaylist for multiple playlist (recent, favorite...)
		// LATER: addTrack(track) {}
	},
})

export const initAudioHandler = () => {
	const player = useAudioState()

	player._audio.addEventListener('ended', () => {
		player.skipTrack()
	})

	if (window.navigator.mediaSession) {
		navigator.mediaSession.setActionHandler('play', async () => player.play())
		navigator.mediaSession.setActionHandler('pause', () => player.pause())
		navigator.mediaSession.setActionHandler('nexttrack', () => player.skipTrack())
		navigator.mediaSession.setActionHandler('previoustrack', () => player.skipTrack(false))
	}
}
