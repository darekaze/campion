import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useMediaControls, useEventListener, useTitle } from '@vueuse/core'
import { getSongs } from '@/data/songs'

export const useAudioState = defineStore('player', () => {
	const playlist = ref(getSongs())
	const currentIndex = useStorage('currentIndex', 0)
	const currentTrack = computed(() => playlist.value[currentIndex.value])

	const _audio = ref(new Audio())
	const { playing, currentTime, duration } = useMediaControls(_audio)

	// utils
	const updatePositionState = () => {
		try {
			navigator.mediaSession.setPositionState({
				duration: _audio.value.duration,
				playbackRate: _audio.value.playbackRate,
				position: _audio.value.currentTime,
			})
		} catch {}
	}

	const updateMetadata = () => {
		const { title, artist, album, artwork_url } = currentTrack.value

		useTitle(`${artist} - ${title}`, { titleTemplate: '%s | Campion' })
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title,
				artist,
				album,
				artwork: [{ src: artwork_url, sizes: '512x512', type: 'image/jpg' }],
			})
		}
	}

	const startAudio = () => {
		_audio.value.src = currentTrack.value.url
		_audio.value
			.play()
			.then(() => {
				updateMetadata()
				updatePositionState()
			})
			.catch(() => null)
	}

	// actions
	const setTrack = (index: number) => {
		currentIndex.value = index
		startAudio()
	}

	const skipTrack = (forward = true) => {
		currentIndex.value = (currentIndex.value + (forward ? 1 : -1)) % playlist.value.length
		startAudio()
	}

	const seekTo = (sec: number) => {
		currentTime.value = sec
	}

	// setup
	if (currentTrack.value) {
		_audio.value.src = currentTrack.value.url
		updateMetadata()
	}

	useEventListener(_audio, 'ended', () => skipTrack())

	if ('mediaSession' in navigator) {
		useEventListener(_audio, 'play', () => {
			navigator.mediaSession.playbackState = 'playing'
		})
		useEventListener(_audio, 'pause', () => {
			navigator.mediaSession.playbackState = 'paused'
		})

		navigator.mediaSession.setActionHandler('play', () => (playing.value = true))
		navigator.mediaSession.setActionHandler('pause', () => (playing.value = false))
		navigator.mediaSession.setActionHandler('nexttrack', () => skipTrack())
		navigator.mediaSession.setActionHandler('previoustrack', () => skipTrack(false))

		try {
			navigator.mediaSession.setActionHandler('seekto', ({ fastSeek, seekTime }) => {
				if (fastSeek && 'fastSeek' in _audio.value) {
					_audio.value.fastSeek(seekTime || 0)
					return
				}
				seekTo(seekTime || 0)
				updatePositionState()
			})
		} catch {}
	}

	// LATER: split playlist as a store
	// LATER: setPlaylist for multiple playlist (recent, favorite...)

	return {
		_audio,
		// audio state
		playing,
		duration,
		currentTime,

		// playlist state
		playlist,
		currentIndex,
		currentTrack,

		// actions
		setTrack,
		skipTrack,
		seekTo,
	}
})
