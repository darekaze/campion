import { useEventListener, useTitle } from '@vueuse/core'
import { useAudioState } from '@/modules/audio'
import type { ITrack } from '@/data/songs'

export const changePlaybackState = (state: 'playing' | 'paused') => {
	if (!navigator.mediaSession) return

	navigator.mediaSession.playbackState = state
}

export const changeMetadata = ({ title, artist, album, artwork_url }: ITrack) => {
	useTitle(`${artist} - ${title}`, { titleTemplate: '%s | Campion' })

	if (!navigator.mediaSession) return

	navigator.mediaSession.metadata = new MediaMetadata({
		title,
		artist,
		album,
		artwork: [{ src: artwork_url, sizes: '512x512', type: 'image/jpg' }],
	})
}

export const initAudioHandler = () => {
	const player = useAudioState()

	useEventListener(player._audio, 'ended', () => {
		player.skipTrack()
	})

	if (navigator.mediaSession) {
		navigator.mediaSession.setActionHandler('play', () => player.play())
		navigator.mediaSession.setActionHandler('pause', () => player.pause())
		navigator.mediaSession.setActionHandler('nexttrack', () => player.skipTrack())
		navigator.mediaSession.setActionHandler('previoustrack', () => player.skipTrack(false))
		navigator.mediaSession.setActionHandler('seekto', ({ seekTime }) => {
			if (!seekTime) return

			player.seekTo(seekTime)
			navigator.mediaSession.setPositionState({
				duration: player._audio.duration,
				playbackRate: player._audio.playbackRate,
				position: player._audio.currentTime,
			})
		})
	}
}