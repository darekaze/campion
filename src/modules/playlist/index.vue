<script setup lang="ts">
import { computed } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/vue'
import ListItem from './list-item.vue'
import { usePlaylistState } from '@/modules/player/store'

const name = 'favorite'
const playlist = usePlaylistState()

const isEmpty = computed(() => playlist.getPlaylist(name).length <= 0)

// LATER: reorder
</script>

<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>🎼Playlist</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" :scroll-y="!isEmpty">
			<ion-header collapse="condense" class="mb-4">
				<ion-toolbar>
					<ion-title size="large" class="mt-2">🎼Playlist</ion-title>
				</ion-toolbar>
			</ion-header>

			<div v-if="isEmpty" class="flex flex-col items-center justify-center h-3/4 text-center">
				<p class="pb-2">Playlist looks empty, <br />search and add something..</p>
				<p>
					Made with 💖 by
					<ion-text color="primary">
						<a href="https://github.com/darekaze" target="_blank">DaRekaze</a>
					</ion-text>
				</p>
			</div>

			<!-- LATER: use virtual scroll for performance -->
			<div v-else>
				<list-item
					v-for="(track, index) in playlist.getPlaylist(name)"
					:key="track.id"
					:track="track"
					:playlist="name"
					:index="index"
					:isActive="playlist.key === name && playlist.index === index"
				/>
			</div>
		</ion-content>
	</ion-page>
</template>
