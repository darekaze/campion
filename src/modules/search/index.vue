<script setup lang="ts">
import { ref } from 'vue'
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonSearchbar,
	IonSpinner,
	IonContent,
	IonList,
} from '@ionic/vue'
import SearchItem from './search-item.vue'
import { useSearchQuery } from './hooks'

const input = ref('')
const { isFetching, isError, data } = useSearchQuery(input)
</script>

<template>
	<ion-page>
		<ion-header translucent>
			<ion-toolbar>
				<ion-title>Search</ion-title>
				<ion-spinner slot="end" v-show="isFetching" name="crescent" color="primary" />
			</ion-toolbar>
			<ion-toolbar>
				<ion-searchbar
					v-model="input"
					:debounce="600"
					show-cancel-button="focus"
					placeholder="Search by Artist, Track..."
				/>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="isError" class="text-center">Error Occured</div>
			<ion-list v-else>
				<search-item v-for="track in data" :key="track.id" :track="track" />
			</ion-list>
		</ion-content>
	</ion-page>
</template>
