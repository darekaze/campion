export const formatSongTime = (seconds: number) => {
	const min = Math.floor(seconds / 60)
	const sec = Math.floor(seconds - min * 60)
	const secFormat = sec < 10 ? `0${sec}` : `${sec}`

	return `${min}:${secFormat}`
}
