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
import { musicalNoteOutline, searchOutline, timeOutline } from 'ionicons/icons'
</script>

<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="library" href="/t/library">
					<ion-icon size="small" :icon="musicalNoteOutline" />
					<ion-label>Library</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="search" href="/t/search">
					<ion-icon size="small" :icon="searchOutline" />
					<ion-label>Search</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="recent" href="/t/recent">
					<ion-icon size="small" :icon="timeOutline" />
					<ion-label>Recent</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>
