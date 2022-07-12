import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useMediaControls } from '@vueuse/core'
import { getSongs, ITrack } from '@/data/songs'
import { formatSongTime } from '@/utils/second-format'
import { changePlaybackState, changeMetadata } from '@/utils/audio-session'

export const useAudioState = defineStore('player', {
	state: () => {
		const playlist = useStorage('playlist', getSongs())
		const currentIndex = useStorage('currentIndex', 0)
		const track = playlist.value[currentIndex.value]

		const _audio = ref(new Audio(track?.url))
		_audio.value.preload = 'auto'

		const { playing, currentTime, duration } = useMediaControls(_audio)
		track && changeMetadata(track)

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
			changePlaybackState('playing')
		},
		pause() {
			this._audio.pause()
			changePlaybackState('paused')
		},
		setTrack(track: ITrack, index: number) {
			this._audio.src = track?.url
			this.currentIndex = index
			changeMetadata(track)
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
