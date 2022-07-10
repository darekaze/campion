<script setup lang="ts">
import { IonToolbar, IonLabel, IonIcon, IonThumbnail, IonButtons, IonButton } from '@ionic/vue'
import { play, pause, playForward } from 'ionicons/icons'
import { useAudioState } from '@/modules/audio'

const player = useAudioState()

const onPressed = () => {
	player.playing ? player.pause() : player.play()
}

const onSkipPressed = () => {
	player.skipTrack()
}
</script>

<template>
	<ion-toolbar class="flex items-center">
		<ion-thumbnail slot="start" class="thumb my-2 mr-2">
			<img :src="player.currentTrack.artwork_url" />
		</ion-thumbnail>
		<ion-label>
			<h4>{{ player.currentTrack.title }}</h4>
			<p>{{ player.currentTrack.artist }}</p>
		</ion-label>
		<ion-buttons slot="end">
			<ion-button color="dark" @click="onPressed">
				<ion-icon slot="icon-only" :icon="player.playing ? pause : play" />
			</ion-button>
			<ion-button color="dark" @click="onSkipPressed">
				<ion-icon slot="icon-only" :icon="playForward" />
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
</template>

<style scoped>
.thumb {
	--border-radius: 0.25rem;
}
</style>
