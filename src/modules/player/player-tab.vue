<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonToolbar, IonLabel, IonIcon, IonThumbnail, IonButtons, IonButton } from '@ionic/vue'
import { play, pause, playForward } from 'ionicons/icons'
import { useAudioState } from '@/modules/audio'

const router = useRouter()
const player = useAudioState()

const onPlayPressed = (event: Event) => {
	player.playing ? player.pause() : player.play()
	event.stopPropagation()
}

const onSkipPressed = (event: Event) => {
	player.skipTrack()
	event.stopPropagation()
}

const onPressed = () => {
	router.push('/player')
}
</script>

<template>
	<ion-toolbar class="flex items-center toolbar" @click="onPressed">
		<ion-thumbnail slot="start" class="thumb my-2 mr-2">
			<img :src="player.currentTrack.artwork_url" :alt="player.currentTrack.title" />
		</ion-thumbnail>
		<ion-label>
			<h3>{{ player.currentTrack.title }}</h3>
			<p>{{ player.currentTrack.artist }}</p>
		</ion-label>
		<ion-buttons slot="end">
			<ion-button color="dark" @click="onPlayPressed">
				<ion-icon slot="icon-only" v-if="player.playing" :icon="pause" />
				<ion-icon slot="icon-only" v-else :icon="play" />
			</ion-button>
			<ion-button color="dark" @click="onSkipPressed">
				<ion-icon slot="icon-only" :icon="playForward" />
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</template>

<style scoped>
.toolbar {
	--padding-start: 1rem;
	--padding-end: 1rem;
}
.thumb {
	--border-radius: 0.25rem;
}
</style>
