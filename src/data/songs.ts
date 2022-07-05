export interface Song {
	name: string
	artist: string
	album: string
	url: string
	cover_art_url: string
}

const songs: Song[] = [
	{
		name: "Risin' High (feat Raashan Ahmad)",
		artist: 'Ancient Astronauts',
		album: 'We Are to Answer',
		url: "https://521dimensions.com/song/Ancient Astronauts - Risin' High (feat Raashan Ahmad).mp3",
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg',
	},
	{
		name: 'The Gun',
		artist: 'Lorn',
		album: 'Ask The Dust',
		url: 'https://521dimensions.com/song/08 The Gun.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg',
	},
	{
		name: 'Anvil',
		artist: 'Lorn',
		album: 'Anvil',
		url: 'https://521dimensions.com/song/LORN - ANVIL.mp3',
		cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg',
	},
	{
		name: 'I Came Running',
		artist: 'Ancient Astronauts',
		album: 'We Are to Answer',
		url: 'https://521dimensions.com/song/ICameRunning-AncientAstronauts.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg',
	},
	{
		name: 'First Snow',
		artist: 'Emancipator',
		album: 'Soon It Will Be Cold Enough',
		url: 'https://521dimensions.com/song/FirstSnow-Emancipator.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg',
	},
	{
		name: 'Terrain',
		artist: 'pg.lost',
		album: 'Key',
		url: 'https://521dimensions.com/song/Terrain-pglost.mp3',
		cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/key.jpg',
	},
	{
		name: 'Vorel',
		artist: 'Russian Circles',
		album: 'Guidance',
		url: 'https://521dimensions.com/song/Vorel-RussianCircles.mp3',
		cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/guidance.jpg',
	},
	{
		name: 'Intro / Sweet Glory',
		artist: 'Jimkata',
		album: 'Die Digital',
		url: 'https://521dimensions.com/song/IntroSweetGlory-Jimkata.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/die-digital.jpg',
	},
	{
		name: 'Offcut #6',
		artist: 'Little People',
		album: 'We Are But Hunks of Wood Remixes',
		url: 'https://521dimensions.com/song/Offcut6-LittlePeople.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-but-hunks-of-wood.jpg',
	},
	{
		name: 'Dusk To Dawn',
		artist: 'Emancipator',
		album: 'Dusk To Dawn',
		url: 'https://521dimensions.com/song/DuskToDawn-Emancipator.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/from-dusk-to-dawn.jpg',
	},
	{
		name: 'Anthem',
		artist: 'Emancipator',
		album: 'Soon It Will Be Cold Enough',
		url: 'https://521dimensions.com/song/Anthem-Emancipator.mp3',
		cover_art_url:
			'https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg',
	},
]

export const getSongs = () => songs

export const getSong = (name: string) => songs.find((m) => m.name === name)
