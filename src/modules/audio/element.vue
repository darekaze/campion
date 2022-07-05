<script setup lang="ts">
import { ref } from 'vue'

// State should persist in global (reactive)

let current = 0
let seek = 0

const audioSrc = 'https://521dimensions.com/song/DuskToDawn-Emancipator.mp3'

const audioPlayer = ref<HTMLAudioElement | null>(null)

const onPlaying = () => {
	const { currentTime, duration } = audioPlayer.value || {}

	if (!currentTime || !duration) return

	current = currentTime
	seek = (currentTime / duration) * 100
}
</script>

<!-- https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api -->
<!-- https://github.com/pramit-marattha/react-music-player-app -->
<!-- https://thewebdev.info/2021/01/21/add-an-audio-player-with-vue-3-and-javascript/ -->

<template>
	<audio :src="audioSrc" ref="audioPlayer" @timeupdate="onPlaying" />
</template>
