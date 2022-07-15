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
import PlayerTab from '@/modules/player/player-tab.vue'

// TEMP: replace this with playlist store
import { songs } from '@/utils/initial-data'
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
					v-for="(track, index) in songs"
					:key="track.artist + track.title"
					:track="track"
					:index="index"
				/>
			</ion-list>
		</ion-content>

		<ion-footer>
			<player-tab />
		</ion-footer>
	</ion-page>
</template>
