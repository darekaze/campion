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

import { useAudioState } from '@/modules/audio'
import { formatSongTime } from '@/utils/second-format'

const player = useAudioState()
const status = reactive({
	sync: true,
	lastValue: 0,
})

const formattedCurrentTime = computed(() =>
	status.sync ? player.formattedCurrentTime : formatSongTime(status.lastValue),
)

const onPlayPressed = () => {
	player.playing ? player.pause() : player.play()
}

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
				<img :src="player.currentTrack.artwork_url" :alt="player.currentTrack.title" class="w-80" />
			</div>

			<ion-label class="text-center py-5">
				<h2>
					<strong>{{ player.currentTrack.title }}</strong>
				</h2>
				<h3>{{ player.currentTrack.artist }}</h3>
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
					<p class="text-sm">{{ player.formattedDuration }}</p>
				</div>
			</div>

			<div class="flex justify-center py-5">
				<ion-button size="large" fill="clear" @click="() => player.skipTrack(false)">
					<ion-icon slot="icon-only" :icon="playBack" />
				</ion-button>
				<ion-button size="large" fill="clear" @click="onPlayPressed">
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
