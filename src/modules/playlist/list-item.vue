<script setup lang="ts">
import { Song } from '@/data/songs'
import { IonItem, IonLabel, IonNote } from '@ionic/vue'

defineProps<{ song: Song }>()

</script>

<template>
	<ion-item :detail="false" class="list-item">
	<!-- Album, Title, Artist -->
	<!-- OnClick Play music, if active go to player -->
		<div slot="start" :class="!song.read ? 'dot dot-unread' : 'dot'"></div>
		<ion-label class="ion-text-wrap">
			<h2>
				{{ song.fromName }}
				<span class="date">
					<ion-note>{{ song.date }}</ion-note>
				</span>
			</h2>
			<h3>{{ song.subject }}</h3>
		</ion-label>
	</ion-item>
</template>

<style scoped>
.list-item {
	--padding-start: 0;
	--inner-padding-end: 0;
}

.list-item ion-label {
	margin-top: 12px;
	margin-bottom: 12px;
}

.list-item h2 {
	font-weight: 600;
	margin: 0;
}

.list-item p {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 95%;
}

.list-item .date {
	float: right;
	align-items: center;
	display: flex;
}

.list-item ion-icon {
	color: #c9c9ca;
}

.list-item ion-note {
	font-size: 15px;
	margin-right: 8px;
	font-weight: normal;
}

.list-item ion-note.md {
	margin-right: 14px;
}

.list-item .dot {
	display: block;
	height: 12px;
	width: 12px;
	border-radius: 50%;
	align-self: start;
	margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
	background: var(--ion-color-primary);
}
</style>
