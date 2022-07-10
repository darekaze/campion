<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonToolbar,
	IonThumbnail,
} from '@ionic/vue'
import { playCircle, pauseCircle, playSkipBack, playSkipForward } from 'ionicons/icons'
import { useAudioState } from '@/modules/audio'

const player = useAudioState()
const { currentTime, duration } = storeToRefs(player)

const onPlayPressed = () => {
	player.playing ? player.pause() : player.play()
}

const seekTo = () => {
	// call seek
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

		<ion-content :fullscreen="true" :scroll-y="false">
			<ion-thumbnail>
				<img :src="player.currentTrack.artwork_url" />
			</ion-thumbnail>

			<div class="song-title-artist">
				<div class="song-title">{{ player.currentTrack.title }}</div>
				<div class="artist-name">{{ player.currentTrack.artist }}</div>
			</div>

			<div class="song-timeline">
				<ion-range mode="md" v-model="currentTime" :max="duration" @ionKnobMoveEnd="seekTo">
					<h5 slot="start">{{ currentTime }}</h5>
					<h5 slot="end">{{ duration }}</h5>
				</ion-range>

				<!-- <div class="song-timeline-minutes">
					<ion-grid>
						<ion-row>
							<ion-col size="2" class="song-timer">
								{{ songCurrentTime }}
							</ion-col>

							<ion-col size="2" offset="8" class="song-timer ion-text-end">
								{{ songDuration }}
							</ion-col>
						</ion-row>
					</ion-grid>
				</div> -->
			</div>

			<div class="flex justify-center">
				<ion-buttons slot="secondary">
					<ion-button @click="() => player.skipTrack(false)">
						<ion-icon slot="icon-only" :icon="playSkipBack" />
					</ion-button>
					<ion-button @click="onPlayPressed">
						<ion-icon v-if="player.playing" slot="icon-only" :icon="pauseCircle" />
						<ion-icon v-else slot="icon-only" :icon="playCircle" />
					</ion-button>
					<ion-button @click="player.skipTrack">
						<ion-icon slot="icon-only" :icon="playSkipForward" />
					</ion-button>
				</ion-buttons>
			</div>
		</ion-content>
	</ion-page>
</template>

<style scoped>
.music-art {
	width: 80%;
	margin-top: 20px;
	margin-right: auto;
	margin-left: auto;
	height: 300px;
}

.song-title-artist {
	text-align: center;
	margin-top: 10px;
}

.song-title {
	font-size: 1.2em;
	font-weight: bold;
	font-family: Arial;
}

.artist-name {
	font-size: 0.9em;
	margin-top: 5px;
}

.song-timeline {
	width: 90%;
	margin-right: auto;
	margin-left: auto;
}

.song-timeline-minutes {
	margin-top: -25px;
}

.song-timer {
	font-size: 0.8em;
}

.player-controls {
	width: 50%;
	margin-right: auto;
	margin-left: auto;
}

.play-button {
	font-size: 86px;
	margin-top: -30px;
}

.play-control {
	font-size: 24px;
}
</style>
