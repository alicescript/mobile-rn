import { PeerNetworkStatus } from '@swishh/redux/reducers/messenger.reducer'

export interface MemberBarItem {
	networkStatus: PeerNetworkStatus
	publicKey: string | undefined
}
