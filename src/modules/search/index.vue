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
	onIonViewDidEnter,
} from '@ionic/vue'
import SearchItem from './search-item.vue'
import { useSearchQuery } from './hooks'

const input = ref('')
const searchbar = ref()
const { isFetching, isError, data } = useSearchQuery(input)

onIonViewDidEnter(() => {
	!data.value && searchbar.value?.$el.setFocus()
})
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
					ref="searchbar"
					v-model="input"
					:debounce="600"
					placeholder="Search by Artist, Track..."
					@keyup.enter="(e) => e.target.blur()"
				/>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div v-if="isError" class="text-center">Error Occured</div>

			<!-- LATER: use virtual scroll for performance -->
			<div v-else>
				<search-item v-for="track in data" :key="track.id" :track="track" />
			</div>
		</ion-content>
	</ion-page>
</template>
