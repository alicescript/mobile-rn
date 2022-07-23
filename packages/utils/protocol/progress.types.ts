import beapi from '@swishh/api'

export type StreamProgressType = {
	msg: beapi.protocol.IProgress
	stream: string
}
