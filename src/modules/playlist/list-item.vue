<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonItem, IonThumbnail, IonLabel, IonImg } from '@ionic/vue'
import { useAudioState } from '@/modules/audio'
import type { ITrack } from '@/data/songs'

const router = useRouter()
const player = useAudioState()
const props = defineProps<{ track: ITrack; index: number }>()

const onPressed = () => {
	if (player.currentTrack?.url === props.track.url) {
		router.push('/player')
	} else {
		player.setTrack(props.track, props.index)
		player.play()
	}
}
</script>

<template>
	<ion-item button @click="onPressed" :detail="false" class="item" lines="none">
		<ion-thumbnail slot="start" class="thumb">
			<ion-img :src="track.artwork_url" />
		</ion-thumbnail>
		<ion-label>
			<h2>{{ track.title }}</h2>
			<p>{{ track.artist }}</p>
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
