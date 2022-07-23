<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonItem, IonThumbnail, IonLabel, IonImg } from '@ionic/vue'
import { Track, usePlayerState } from '@/modules/player/store'
import { getImageUrl } from '@/utils/bandcamp'
import { addCircleOutline } from 'ionicons/icons'

const props = defineProps<{ track: Track }>()

const router = useRouter()
const player = usePlayerState()

const onPressed = () => {
	console.log(props.track.title)
	// TODO: handle with recent playlist
	// props.isActive ? router.push('/player') : player.setTrack(props.playlist, props.index)
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
