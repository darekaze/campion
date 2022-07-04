<script setup lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import ListItem from './list-item.vue'
import { getSongs } from '@/data/songs'

const songs = getSongs()
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
				<list-item v-for="song in songs" :key="song.id" :song="song" />
			</ion-list>
		</ion-content>

		<ion-footer>
			<ion-toolbar class="h-20">
				<!-- TODO: music player control -->
				<ion-title>MUSIC PLAYER HERE</ion-title>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>
