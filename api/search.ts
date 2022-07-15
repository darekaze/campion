import got from 'got'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async (req: VercelRequest, res: VercelResponse) => {
	const { q = '', t = 't' } = req.query

	if (!q) return res.status(400).json({ error: 'q is not provided!' })

	const data = await got
		.post('https://bandcamp.com/api/bcsearch_public_api/1/autocomplete_elastic', {
			json: {
				search_text: q,
				search_filter: t,
				full_page: false,
				fan_id: null,
			},
			headers: {
				origin: 'https://bandcamp.com',
				referer: 'https://bandcamp.com/',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0',
			},
		})
		.json<any>()

	return res.status(200).json(
		((data?.auto?.results ?? []) as any[]).map((i) => ({
			id: i.id,
			art_id: i.art_id,
			name: i.name,
			artist: i.band_name,
			album: i.album_name,
			url: i.item_url_path,
		})),
	)
}
