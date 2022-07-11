<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import {
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
import { playCircle, pauseCircle, playSkipBack, playSkipForward } from 'ionicons/icons'
import { useAudioState } from '@/modules/audio'

const player = useAudioState()
const { currentTime, duration } = storeToRefs(player)
const status = reactive({
	sync: true,
	lastValue: 0,
})

const onPlayPressed = () => {
	player.playing ? player.pause() : player.play()
}

const onFocus = () => {
	status.lastValue = currentTime.value
	status.sync = false
}

const onChange = ({ detail }: any) => {
	if (status.sync) return
	status.lastValue = detail.value
}

const seekTo = ({ detail }: any) => {
	player.seekTo(detail.value)
	status.sync = true
}
</script>

<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button text="Playlist" default-href="/"></ion-back-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" :scroll-y="false" class="text-center">
			<div class="flex justify-center h-80 py-10">
				<img :src="player.currentTrack.artwork_url" />
			</div>

			<ion-label class="text-center">
				<h2>
					<strong>{{ player.currentTrack.title }}</strong>
				</h2>
				<h3>{{ player.currentTrack.artist }}</h3>
			</ion-label>

			<div class="w-11/12 mx-auto">
				<ion-range
					mode="md"
					:value="status.sync ? currentTime : status.lastValue"
					:max="duration"
					@ionChange="onChange"
					@ionKnobMoveStart="onFocus"
					@ionKnobMoveEnd="seekTo"
					class="pb-0"
				/>

				<!-- Weird, this does not work on mobile... just use flex -->
				<ion-grid class="py-0">
					<ion-row>
						<ion-col size="2" class="py-0 text-left text-sm">
							{{ player.formattedCurrentTime }}
						</ion-col>
						<ion-col size="2" offset="8" class="py-0 text-end text-sm">
							{{ player.formattedDuration }}
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>

			<div class="flex justify-center py-5">
				<ion-button size="large" fill="clear" @click="() => player.skipTrack(false)">
					<ion-icon slot="icon-only" :icon="playSkipBack" />
				</ion-button>
				<ion-button size="large" fill="clear" @click="onPlayPressed">
					<ion-icon v-if="player.playing" slot="icon-only" :icon="pauseCircle" />
					<ion-icon v-else slot="icon-only" :icon="playCircle" />
				</ion-button>
				<ion-button size="large" fill="clear" @click="player.skipTrack">
					<ion-icon slot="icon-only" :icon="playSkipForward" />
				</ion-button>
			</div>
		</ion-content>
	</ion-page>
</template>
