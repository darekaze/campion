import axios from 'axios'
import { useQuery } from 'vue-query'
import type { Ref, ComputedRef } from 'vue'

// TODO: add res type
// {
// 	"type": "t",
// 	"id": 3932432663,
// 	"art_id": 1344170711,
// 	"img_id": null,
// 	"name": "One Day",
// 	"band_id": 1146411180,
// 	"band_name": "REDALiCE",
// 	"album_name": "Five-star Luster",
// 	"item_url_root": "https://holtunes.bandcamp.com",
// 	"item_url_path": "https://holtunes.bandcamp.com/track/one-day",
// 	"img": "https://f4.bcbits.com/img/1344170711_3.jpg",
// 	"album_id": 495553959,
// 	"stat_params": "search_item_id=3932432663&search_item_type=t&search_match_part=%3F&search_page_id=2123157308&search_page_no=0&search_rank=7"
// },

export const useSearchQuery = (
	query: Ref<string>,
	{ enabled }: { enabled: ComputedRef<boolean> },
) =>
	useQuery(['search', query], () => axios.get('/api/search', { params: { q: query.value } }), {
		enabled,
		select: (res) => res.data, // filter here
	})
