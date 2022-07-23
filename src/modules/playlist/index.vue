<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonFooter,
} from '@ionic/vue'
import ListItem from './list-item.vue'
import { usePlaylistState } from '@/modules/player/store'

// TODO: this doesn't belongs to here
import PlayerTab from '@/modules/tab/player-tab.vue'

// LATER: reorder

const playlist = usePlaylistState()
const name = 'favorite'
</script>

<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Play</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense" class="mb-4">
				<ion-toolbar>
					<ion-title size="large" class="mt-2">🎼Play</ion-title>
				</ion-toolbar>
			</ion-header>

			<ion-list>
				<list-item
					v-for="(track, index) in playlist.getPlaylist(name)"
					:key="track.artist + track.title"
					:track="track"
					:playlist="name"
					:index="index"
					:isActive="track.url === playlist.currentTrack?.url"
				/>
			</ion-list>
		</ion-content>

		<ion-footer>
			<player-tab />
		</ion-footer>
	</ion-page>
</template>
