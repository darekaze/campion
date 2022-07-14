<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'

// FUCK CORS, need to use server proxy (host in vercel function)
// const url = ref('https://bandcamp.com/api/bcsearch_public_api/1/autocomplete_elastic')
// const { isFetching, error, data } = useFetch(url)
// 	.post({
// 		search_text: 'redalice',
// 		search_filter: 't',
// 		full_page: false,
// 		fan_id: null,
// 	})
// 	.json()

// TODO: try adding bandcamp search
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
					<ion-title size="large">Tab 2</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="flex justify-center">
				<h2>Blablabla</h2>
				<!-- <pre>{{ data }}</pre> -->
			</div>
		</ion-content>
	</ion-page>
</template>
