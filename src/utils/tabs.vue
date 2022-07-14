<script setup lang="ts">
import {
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonLabel,
	IonIcon,
	IonPage,
	IonRouterOutlet,
} from '@ionic/vue'
import { library, search, receipt } from 'ionicons/icons'
</script>

<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="playlist" href="/t/playlist">
					<ion-icon :icon="library" />
					<ion-label>Playlist</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="search" href="/t/search">
					<ion-icon :icon="search" />
					<ion-label>Search</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="recent" href="/t/recent">
					<ion-icon :icon="receipt" />
					<ion-label>Recent</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>
