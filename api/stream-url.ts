import type { VercelRequest, VercelResponse } from '@vercel/node'

export default (req: VercelRequest, res: VercelResponse) => {
	// TODO: impl. get stream url (extract from html file)
	const { name } = req.query
	res.status(200).send(`Hello ${name}!`)
}
