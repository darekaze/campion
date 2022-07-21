import { Track } from '@/modules/player/store'

const songs: Track[] = [
	{
		id: 136118456,
		art_id: 1569829819,
		title: 'XTREME',
		artist: 'USAO',
		album: 'XTREME',
		url: 'https://usao.bandcamp.com/track/xtreme',
	},
	{
		id: 3377178725,
		art_id: 4225425949,
		title: 'Cthugha',
		artist: 'USAO',
		album: 'Cthugha',
		url: 'https://tanoc.bandcamp.com/track/cthugha',
	},
	{
		id: 2462169050,
		art_id: 1769418663,
		title: 'Cyaegha',
		artist: 'USAO',
		album: 'Cyaegha',
		url: 'https://tanoc.bandcamp.com/track/cyaegha',
	},
]

export const getSongs = () => songs
