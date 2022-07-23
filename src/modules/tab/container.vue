<script setup lang="ts">
import {
	IonPage,
	IonRouterOutlet,
	IonFooter,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonLabel,
	IonIcon,
} from '@ionic/vue'
import { musicalNoteOutline, searchOutline } from 'ionicons/icons'
import PlayerTab from './player-tab.vue'
</script>

<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-footer slot="bottom">
				<player-tab />

				<ion-tab-bar>
					<ion-tab-button tab="home" href="/t/home">
						<ion-icon size="small" :icon="musicalNoteOutline" />
						<ion-label>Playlist</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="search" href="/t/search">
						<ion-icon size="small" :icon="searchOutline" />
						<ion-label>Search</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-footer>
		</ion-tabs>
	</ion-page>
</template>
