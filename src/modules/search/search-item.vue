<script setup lang="ts">
import { IonItem, IonThumbnail, IonLabel, IonImg, IonIcon, toastController } from '@ionic/vue'
import { Track, usePlaylistState } from '@/modules/player/store'
import { getImageUrl } from '@/utils/bandcamp'
import { addCircleOutline, musicalNote } from 'ionicons/icons'

const props = defineProps<{ track: Track }>()

const playlist = usePlaylistState()

const onPressed = async () => {
	const added = playlist.addTrackToPlaylist('favorite', props.track)
	const message = added
		? `${props.track.title} added to playlist`
		: `${props.track.title} already in playlist`

	const toast = await toastController.create({
		position: 'top',
		duration: 1500,
		icon: musicalNote,
		message,
	})
	return toast.present()
}
</script>

<template>
	<ion-item button @click="onPressed" :detail="false" class="item" lines="none">
		<ion-thumbnail slot="start" class="thumb">
			<ion-img :src="getImageUrl(track.art_id)" :alt="track.title" />
		</ion-thumbnail>
		<ion-label>
			<h2>{{ track.title }}</h2>
			<p>{{ track.artist }}</p>
		</ion-label>
		<ion-icon slot="end" :icon="addCircleOutline" />
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
