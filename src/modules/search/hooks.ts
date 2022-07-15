import ky from 'ky'
import { useQuery } from 'vue-query'
import { computed, Ref } from 'vue'

export type BCItem = {
	id: number
	art_id: number
	name: string
	artist: string
	album?: string
	url: string
}

export const useSearchQuery = (query: Ref<string>) =>
	useQuery<BCItem[]>(
		['search', query],
		() => ky.get('/api/search', { searchParams: { q: query.value } }).json(),
		{
			refetchOnWindowFocus: false,
			enabled: computed(() => !!query.value),
		},
	)
