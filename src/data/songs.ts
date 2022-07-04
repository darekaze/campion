export interface Song {
	fromName: string
	subject: string
	date: string
	id: number
	read?: boolean
}

const songs: Song[] = [
	{
		fromName: 'Matt Chorsey',
		subject: 'New event: Trip to Vegas',
		date: '9:32 AM',
		id: 0,
	},
	{
		fromName: 'Lauren Ruthford',
		subject: 'Long time no chat',
		date: '6:12 AM',
		id: 1,
	},
	{
		fromName: 'Jordan Firth',
		subject: 'Report Results',
		date: '4:55 AM',
		id: 2,
	},
	{
		fromName: 'Bill Thomas',
		subject: 'The situation',
		date: 'Yesterday',
		id: 3,
	},
	{
		fromName: 'Joanne Pollan',
		subject: 'Updated invitation: Swim lessons',
		date: 'Yesterday',
		id: 4,
	},
	{
		fromName: 'Andrea Cornerston',
		subject: 'Last minute ask',
		date: 'Yesterday',
		id: 5,
	},
	{
		fromName: 'Moe Chamont',
		subject: 'Family Calendar - Version 1',
		date: 'Last Week',
		id: 6,
	},
	{
		fromName: 'Kelly Richardson',
		subject: 'Placeholder Headhots',
		date: 'Last Week',
		id: 7,
	},
	{
		fromName: 'Moe Chamont',
		subject: 'Family Calendar - Version 1',
		date: 'Last Week',
		id: 8,
	},
	{
		fromName: 'Kelly Richardson',
		subject: 'Placeholder Headhots',
		date: 'Last Week',
		id: 9,
	},
	{
		fromName: 'Moe Chamont',
		subject: 'Family Calendar - Version 1',
		date: 'Last Week',
		id: 10,
	},
	{
		fromName: 'Kelly Richardson',
		subject: 'Placeholder Headhots',
		date: 'Last Week',
		id: 11,
	},
]

export const getSongs = () => songs

export const getSong = (id: number) => songs.find((m) => m.id === id)
