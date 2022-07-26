import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useMediaControls, useEventListener, useTitle } from '@vueuse/core'
import { usePlaylistState } from './playlist'
import { getImageUrl } from '@/utils/bandcamp'

export const usePlayerState = defineStore('player', () => {
	const _audio = ref(new Audio())
	const { playing, currentTime, duration } = useMediaControls(_audio)
	const playlist = usePlaylistState()

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
		const { title, artist, album, art_id } = playlist.currentTrack

		useTitle(`${artist} - ${title}`, { titleTemplate: '%s | Campion' })
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title,
				artist,
				album,
				artwork: [
					{ src: getImageUrl(art_id, 2), sizes: '256x256', type: 'image/jpg' },
					{ src: getImageUrl(art_id, 5), sizes: '512x512', type: 'image/jpg' },
				],
			})
		}
	}

	const initPlayer = async () => {
		if (!playlist.currentTrack) return

		_audio.value.src = await playlist.getStreamUrl(playlist.currentTrack.url)
		updateMetadata()
	}

	const startAudio = async () => {
		if (!playlist.currentTrack) return
		try {
			_audio.value.src = await playlist.getStreamUrl(playlist.currentTrack.url)
			await _audio.value.play()
			updateMetadata()
			updatePositionState()
		} catch {}
	}

	// actions
	const setTrack = (key: string, index: number) => {
		playlist.$patch({ key, index })
		startAudio()
	}

	const skipTrack = (forward = true) => {
		if (playlist.currentPlaylist?.length <= 1) return

		if (!forward && playlist.index <= 0) {
			playlist.index = playlist.currentPlaylist.length - 1
		} else {
			playlist.index = (playlist.index + (forward ? 1 : -1)) % playlist.currentPlaylist.length
		}

		startAudio()
	}

	const seekTo = (sec: number) => {
		currentTime.value = sec
	}

	// setup
	initPlayer()
	useEventListener(_audio, 'ended', () => skipTrack())
	// onSourceError(() => startAudio())

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

	return {
		// states
		playing,
		duration,
		currentTime,

		// actions
		setTrack,
		skipTrack,
		seekTo,
	}
})
