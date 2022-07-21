import ky from 'ky'

export const getImageUrl = (art_id: number, type = 3) =>
	`https://f4.bcbits.com/img/a${art_id}_${type}.jpg`

export const fetchStreamUrl = async (url: string) => {
	const res = await ky.get('/api/streamlink', { searchParams: { url } }).json<{ url: string }>()

	return res.url
}
