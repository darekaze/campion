import got from 'got'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const RE_STREAM_URL = /https:\/\/[^.]+\.bcbits\.com\/stream\/.+?(?=&quot;)/g

export default async (req: VercelRequest, res: VercelResponse) => {
	const { url = '' } = req.query

	if (!url) return res.status(400).json({ error: 'url is not provided!' })

	try {
		const { body } = await got(url as string)
		const [streamUrl] = body.match(RE_STREAM_URL) ?? []

		return streamUrl
			? res.status(200).json({ url: streamUrl.replace(/&amp;/g, '&') })
			: res.status(400).json({ error: 'Failed to get stream url' })
	} catch {
		return res.status(400).json({ error: 'Endpoint or URL error' })
	}
}
