import { Track } from '@/modules/player/store'

const songs: Track[] = [
	{
		id: 2524848285,
		art_id: 2830054459,
		title: 'crystallized',
		artist: 'かめりあ(Camellia)',
		album: 'crystallized',
		url: 'https://cametek.bandcamp.com/track/crystallized',
	},
	{
		id: 3445933713,
		art_id: 2155786442,
		title: 'Lau-Fi',
		artist: 'Laur',
		album: 'IRREGULAR NATION 8',
		url: 'https://tanoc.bandcamp.com/track/lau-fi-2',
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
