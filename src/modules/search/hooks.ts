import ky from 'ky'
import { computed, Ref } from 'vue'
import { useQuery } from 'vue-query'
import type { Track } from '@/modules/player/store'

const STALE_TIME = 5 * 60 * 1000 // 5 mins

type BCItem = {
	id: number
	art_id: number
	name: string
	artist: string
	album?: string
	url: string
}

export const useSearchQuery = (query: Ref<string>) =>
	useQuery(
		['search', query],
		() => ky.get('/api/search', { searchParams: { q: query.value } }).json<BCItem[]>(),
		{
			staleTime: STALE_TIME,
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			enabled: computed(() => !!query.value),
			select: (items) =>
				items.map<Track>((i) => ({
					id: i.id,
					art_id: i.art_id,
					title: i.name,
					artist: i.artist,
					album: i.album ?? i.name,
					url: i.url,
				})),
		},
	)
