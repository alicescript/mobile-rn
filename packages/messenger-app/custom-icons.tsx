import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import Swishh from '@swishh/assets/custom-icons/swishh_picto.svg'
import CameraOutline from '@swishh/assets/custom-icons/camera-outline.svg'
import Camera from '@swishh/assets/custom-icons/camera.svg'
import Network from '@swishh/assets/custom-icons/chart-network-light.svg'
import Earth from '@swishh/assets/custom-icons/earth.svg'
import ExpertBluetooth from '@swishh/assets/custom-icons/expert-bluetooth.svg'
import ExpertSetting from '@swishh/assets/custom-icons/expert-mdns.svg'
import Files from '@swishh/assets/custom-icons/files.svg'
import Fingerprint from '@swishh/assets/custom-icons/fingerprint.svg'
import Gallery from '@swishh/assets/custom-icons/gallery.svg'
import MicrophoneFooter from '@swishh/assets/custom-icons/microphone-footer.svg'
import Microphone from '@swishh/assets/custom-icons/microphone.svg'
import Pause from '@swishh/assets/custom-icons/pause-player.svg'
import Peer from '@swishh/assets/custom-icons/peer.svg'
import Play from '@swishh/assets/custom-icons/play-player.svg'
import Privacy from '@swishh/assets/custom-icons/privacy.svg'
import Proximity from '@swishh/assets/custom-icons/proximity.svg'
import QRCode from '@swishh/assets/custom-icons/qr.svg'
import Quote from '@swishh/assets/custom-icons/quote.svg'
import Services from '@swishh/assets/custom-icons/services.svg'
import Share from '@swishh/assets/custom-icons/share.svg'
import Transport4g from '@swishh/assets/custom-icons/transport-icons/transport-4g.svg'
import TransportBle from '@swishh/assets/custom-icons/transport-icons/transport-ble.svg'
import TransportNode from '@swishh/assets/custom-icons/transport-icons/transport-node.svg'
import TransportWifi from '@swishh/assets/custom-icons/transport-icons/transport-wifi.svg'
import UserPlus from '@swishh/assets/custom-icons/user-plus.svg'
import Users from '@swishh/assets/custom-icons/users.svg'
import WrongMan from '@swishh/assets/custom-icons/wrong-man.svg'

const iconsMap: { [key: string]: React.FC<SvgProps> } = {
	fingerprint: Fingerprint,
	qr: QRCode,
	share: Share,
	users: Users,
	'user-plus': UserPlus,
	quote: Quote,
	earth: Earth,
	network: Network,
	swishh: Swishh,
	microphone: Microphone,
	play: Play,
	pause: Pause,
	camera: Camera,
	gallery: Gallery,
	files: Files,
	'camera-outline': CameraOutline,
	'wrong-man': WrongMan,
	privacy: Privacy,
	'microphone-footer': MicrophoneFooter,
	proximity: Proximity,
	peer: Peer,
	services: Services,
	'expert-ble': ExpertBluetooth,
	'expert-setting': ExpertSetting,
	// transport icons
	'transport-4g': Transport4g,
	'transport-ble': TransportBle,
	'transport-node': TransportNode,
	'transport-wifi': TransportWifi,
}

const CustomIcon: React.FC<{
	name: string
	width: number
	height: number
	fill: string
	style: StyleProp<ViewStyle>
}> = ({ name, width, height, fill, style = [] }) => {
	const Icon = iconsMap[name]
	if (!Icon) {
		return null
	}
	return <Icon width={width} height={height} color={fill} style={style} />
}

const IconProvider = (name: string) => ({
	toReactElement: (props: any) => CustomIcon({ name, ...props }),
})

function createIconsMap() {
	return new Proxy(
		{},
		{
			get(_, name: string) {
				return IconProvider(name)
			},
		},
	)
}

export const CustomIconsPack = {
	name: 'custom',
	icons: createIconsMap(),
}
