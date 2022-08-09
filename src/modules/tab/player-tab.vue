<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { IonToolbar, IonLabel, IonIcon, IonThumbnail, IonButtons, IonButton } from '@ionic/vue'
import { play, pause, playForward } from 'ionicons/icons'

import { usePlayerState, usePlaylistState } from '@/modules/player/store'
import { getImageUrl } from '@/utils/bandcamp'

const router = useRouter()
const player = usePlayerState()
const playlist = usePlaylistState()

const width = computed(() => `${((player.currentTime / player.duration) * 100).toFixed(2)}%`)

const onPlayPressed = (event: Event) => {
	player.playing = !player.playing
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
	<ion-toolbar v-if="playlist.currentTrack" class="flex items-center toolbar" @click="onPressed">
		<ion-thumbnail slot="start" class="thumb my-2 mr-2">
			<img :src="getImageUrl(playlist.currentTrack.art_id)" :alt="playlist.currentTrack.title" />
		</ion-thumbnail>
		<ion-label>
			<h3>{{ playlist.currentTrack.title }}</h3>
			<p>{{ playlist.currentTrack.artist }}</p>
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
	<div class="w-full">
		<div class="visible flex h-0.4 bg-light-900">
			<div class="flex-col justify-center bg-purple-500" :style="{ width }"></div>
		</div>
	</div>
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
