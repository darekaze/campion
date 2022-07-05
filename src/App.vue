<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { MyAudio } from './modules/audio'
</script>

<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
	<my-audio />
</template>
