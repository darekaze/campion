<script setup lang="ts">
import { Song } from '@/data/songs'
import { IonItem, IonThumbnail, IonLabel } from '@ionic/vue'

const props = defineProps<{ song: Song }>()

const onPressed = () => {
	// TODO: OnClick Play music, if active go to player
	console.log(`Clicked on ${props.song.name}`)
}
</script>

<template>
	<ion-item button @click="onPressed" :detail="false" class="item" lines="none">
		<ion-thumbnail slot="start" class="thumb">
			<img :src="song.cover_art_url" />
		</ion-thumbnail>
		<ion-label>
			<h2>{{ song.name }}</h2>
			<p>{{ song.artist }}</p>
		</ion-label>
	</ion-item>
</template>

<style scoped>
.item {
	--padding-top: 0.5rem;
	--padding-bottom: 0.5rem;
}

.thumb {
	--border-radius: 0.25rem;
}
</style>
