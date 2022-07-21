import got from 'got'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const RE_STREAM_URL = /https:\/\/[^.]+\.bcbits\.com\/stream\/[^;"]*/g

const htmlDecode = (str: string) => str.replace(/&amp;/g, '&').replace(/&quot;/g, '"')

export default async (req: VercelRequest, res: VercelResponse) => {
	const { url = '' } = req.query

	if (!url) return res.status(400).json({ error: 'url is not provided!' })

	try {
		const { body } = await got(url as string)
		const [streamUrl] = htmlDecode(body).match(RE_STREAM_URL) ?? []

		return res.status(200).json({ url: streamUrl })
	} catch {
		return res.status(400).json({ error: 'url error' })
	}
}
