<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
	IonItem,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonThumbnail,
	IonLabel,
	IonImg,
} from '@ionic/vue'
import { Track, usePlayerState, usePlaylistState } from '@/modules/player/store'
import { getImageUrl } from '@/utils/bandcamp'

const props = defineProps<{ track: Track; playlist: string; index: number; isActive: boolean }>()

const router = useRouter()
const player = usePlayerState()
const playlist = usePlaylistState()

const onPressed = () => {
	props.isActive ? router.push('/player') : player.setTrack(props.playlist, props.index)
}

const onDelete = () => {
	playlist.removeTrackFromPlaylist(props.playlist, props.index)
	props.isActive && player.setTrack(props.playlist, playlist.index)
}
</script>

<template>
	<ion-item-sliding>
		<ion-item button @click="onPressed" :detail="false" class="item" lines="none">
			<ion-thumbnail slot="start" class="thumb">
				<ion-img :src="getImageUrl(track.art_id)" :alt="track.title" />
			</ion-thumbnail>
			<ion-label :color="isActive ? 'primary' : 'dark'">
				<h2>{{ track.title }}</h2>
				<p>{{ track.artist }}</p>
			</ion-label>
		</ion-item>

		<ion-item-options side="end">
			<ion-item-option @click="onDelete" color="danger">Delete</ion-item-option>
		</ion-item-options>
	</ion-item-sliding>
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
