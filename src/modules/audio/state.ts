import { defineStore } from 'pinia'

// TODO: use Pinia to define player state
// Think of a way to generate audio tag
// Handle media session API here?

export const usePlayerState = defineStore('player', {
	state: () => ({
		/** @type {{ text: string, id: number, isFinished: boolean }[]} */
		playlist: [],
		/** @type {'all' | 'finished' | 'unfinished'} */
		state: 'all',
	}),
	actions: {
		play() {
			console.log('play')
		},
		pause() {
			console.log('pause')
		},
		next() {
			console.log('next')
		},
		prev() {
			console.log('previous')
		},
	},
})
