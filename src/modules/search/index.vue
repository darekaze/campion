<script setup lang="ts">
import { ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { useSearchQuery } from './hooks'

const input = ref('')
const query = refDebounced(input, 600)

const { isLoading, isError, data } = useSearchQuery(query)
</script>

<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Search</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Search</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="flex-col text-center">
				<input v-model="input" placeholder="Try to type anything..." type="text" />

				<span v-if="isLoading">Loading...</span>
				<span v-else-if="isError">Error Occured</span>
				<ul v-else>
					<li v-for="track in data" :key="track.id">{{ track.name }}</li>
				</ul>
			</div>
		</ion-content>
	</ion-page>
</template>
