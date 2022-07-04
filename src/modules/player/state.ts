import { defineStore } from 'pinia'

// TODO: use Pinia to define player state
// Init amplify here?
// Handle media session API here?

export const usePlayerState = defineStore('player', {
	state: () => ({
		/** @type {{ text: string, id: number, isFinished: boolean }[]} */
		playlist: [],
		/** @type {'all' | 'finished' | 'unfinished'} */
		filter: 'all',
		// type will be automatically inferred to number
		nextId: 0,
	}),
	actions: {
		increment() {
			this.nextId++
		},
	},
})
