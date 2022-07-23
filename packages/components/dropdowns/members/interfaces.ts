import beapi from '@swishh/api'

export interface IMemberUserTypes {
	memberUserType?: 'replication' | 'user'
}
export interface IMemberTransports {
	memberTransport?: beapi.messenger.StreamEvent.PeerStatusConnected.Transport
}
export interface IMemberStatus {
	memberStatus: beapi.protocol.GroupDeviceStatus.Type
}
