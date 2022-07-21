<script setup lang="ts">
import { computed, reactive } from 'vue'
import { play, pause, playBack, playForward } from 'ionicons/icons'
import {
	IonTitle,
	IonBackButton,
	IonButtons,
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonToolbar,
	IonLabel,
	IonRange,
} from '@ionic/vue'
import type {
	IonRangeCustomEvent,
	RangeChangeEventDetail,
	RangeKnobMoveEndEventDetail,
} from '@ionic/core'

import { getImageUrl } from '@/utils/bandcamp'
import { formatSongTime } from '@/utils/second-format'
import { usePlayerState, usePlaylistState } from './store'

const player = usePlayerState()
const playlist = usePlaylistState()
const status = reactive({
	sync: true,
	lastValue: 0,
})

const formattedDuration = computed(() => formatSongTime(player.duration))
const formattedCurrentTime = computed(() =>
	status.sync ? formatSongTime(player.currentTime) : formatSongTime(status.lastValue),
)

const onFocus = () => {
	status.lastValue = player.currentTime
	status.sync = false
}

const onChange = ({ detail }: IonRangeCustomEvent<RangeChangeEventDetail>) => {
	if (status.sync) return
	status.lastValue = detail.value as number
}

const seekTo = ({ detail }: IonRangeCustomEvent<RangeKnobMoveEndEventDetail>) => {
	player.seekTo(detail.value as number)
	status.sync = true
}
</script>

<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button text="Home" default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title class="text-sm">PLAYING</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :scroll-y="false">
			<div class="flex justify-center">
				<img
					:src="getImageUrl(playlist.currentTrack.art_id, 10)"
					:alt="playlist.currentTrack.title"
					class="w-60 rounded-md"
				/>
			</div>

			<ion-label class="text-center pt-6 pb-2">
				<h2>
					<strong>{{ playlist.currentTrack.title }}</strong>
				</h2>
				<h3>{{ playlist.currentTrack.artist }}</h3>
			</ion-label>

			<div class="w-11/12 mx-auto">
				<ion-range
					mode="md"
					:value="status.sync ? player.currentTime : status.lastValue"
					:max="player.duration"
					@ionChange="onChange"
					@ionKnobMoveStart="onFocus"
					@ionKnobMoveEnd="seekTo"
					class="pb-0"
				/>
				<div class="flex justify-between mx-2">
					<p class="text-sm">{{ formattedCurrentTime }}</p>
					<p class="text-sm">{{ formattedDuration }}</p>
				</div>
			</div>

			<div class="flex justify-center">
				<ion-button size="large" fill="clear" @click="() => player.skipTrack(false)">
					<ion-icon slot="icon-only" :icon="playBack" />
				</ion-button>
				<ion-button size="large" fill="clear" @click="player.playing = !player.playing">
					<ion-icon v-if="player.playing" slot="icon-only" :icon="pause" />
					<ion-icon v-else slot="icon-only" :icon="play" />
				</ion-button>
				<ion-button size="large" fill="clear" @click="player.skipTrack">
					<ion-icon slot="icon-only" :icon="playForward" />
				</ion-button>
			</div>
		</ion-content>
	</ion-page>
</template>

<style scoped>
ion-content::part(scroll) {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
