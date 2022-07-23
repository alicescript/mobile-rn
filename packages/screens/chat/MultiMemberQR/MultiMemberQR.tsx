import Clipboard from '@react-native-clipboard/clipboard'
import { Icon, Layout } from '@ui-kitten/components'
import React from 'react'
import { Share, TouchableOpacity, View, StatusBar, Platform } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import beapi from '@swishh/api'
import logo from '@swishh/assets/images/1_swishh_picto.png'
import { MultiMemberAvatar } from '@swishh/components/avatars'
import { UnifiedText } from '@swishh/components/shared-components/UnifiedText'
import { useAppDimensions } from '@swishh/contexts/app-dimensions.context'
import { useStyles } from '@swishh/contexts/styles'
import { useConversation, useStylesSwishhId, useThemeColor } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'

const styleSwishhIdOptions = {
	iconIdSize: 30,
	iconShareSize: 26,
	titleSize: 25,
	contentScaleFactor: 0.66,
	avatarSize: 80,
}

const SelectedContent: React.FC<{ conv: beapi.messenger.IConversation }> = ({ conv }) => {
	const { padding, margin, border, column, text } = useStyles()
	const { qrCodeSize, requestAvatarSize, styleSwishhIdContent } =
		useStylesSwishhId(styleSwishhIdOptions)

	const colors = useThemeColor()

	return (
		<View
			style={[
				border.radius.scale(30),
				margin.horizontal.medium,
				padding.top.large,
				{ backgroundColor: colors['main-background'], top: 70 },
				styleSwishhIdContent,
			]}
		>
			<View style={[{ top: -70 }]}>
				<View
					style={[
						border.shadow.big,
						{
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 20,
							shadowColor: colors.shadow,
						},
					]}
				>
					<MultiMemberAvatar publicKey={conv?.publicKey} size={requestAvatarSize} />
				</View>
				<UnifiedText style={[text.light, text.align.center, text.size.large]}>
					{conv?.displayName}
				</UnifiedText>
			</View>
			<View style={[padding.horizontal.big, { top: -30 }]}>
				<View style={[column.item.center]}>
					{!!conv.link && (
						<QRCode
							size={qrCodeSize}
							value={conv.link}
							logo={logo}
							mode='circle'
							color={colors['background-header']}
							backgroundColor={colors['main-background']}
						/>
					)}
				</View>
			</View>
		</View>
	)
}

const SwishhIdShare: React.FC<{ url?: string | null }> = ({ url }) => {
	const { row, border, flex } = useStyles()
	const colors = useThemeColor()
	const { styleSwishhIdButton, iconShareSize } = useStylesSwishhId(styleSwishhIdOptions)
	if (!url) {
		return null
	}
	return (
		<TouchableOpacity
			style={[
				row.item.bottom,
				border.shadow.medium,
				{ backgroundColor: colors['positive-asset'], top: 45, shadowColor: colors.shadow },
				styleSwishhIdButton,
			]}
			onPress={async () => {
				try {
					console.log('sharing', url)
					if (Platform.OS === 'web') {
						Clipboard.setString(url)
					} else {
						await Share.share({ url, message: url })
					}
				} catch (e) {
					console.error(e)
				}
			}}
		>
			<View style={[flex.tiny, { justifyContent: 'center' }]}>
				<Icon
					style={row.item.justify}
					name='share'
					pack='custom'
					width={iconShareSize}
					height={iconShareSize}
					fill={colors['background-header']}
				/>
			</View>
		</TouchableOpacity>
	)
}

const MultiMemberComponent: React.FC<{ conv: beapi.messenger.IConversation }> = ({ conv }) => {
	const { padding } = useStyles()
	const { scaleSize } = useAppDimensions()
	const colors = useThemeColor()

	return (
		<View
			style={[
				padding.medium,
				{
					paddingTop: 16 * scaleSize,
					flexGrow: 2,
					flexBasis: '100%',
					backgroundColor: colors['background-header'],
				},
			]}
		>
			<SelectedContent conv={conv} />
			<SwishhIdShare url={conv.link} />
		</View>
	)
}

export const MultiMemberQR: ScreenFC<'Chat.MultiMemberQR'> = ({
	route: {
		params: { convId },
	},
	navigation,
}) => {
	const colors = useThemeColor()
	const conv = useConversation(convId)
	const { iconIdSize } = useStylesSwishhId(styleSwishhIdOptions)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Icon
					name='users'
					pack='custom'
					width={iconIdSize}
					height={iconIdSize}
					fill={colors['reverted-main-text']}
				/>
			),
		})
	})
	if (!conv) {
		return null
	}
	return (
		<Layout style={[{ backgroundColor: 'transparent', flex: 1 }]}>
			<StatusBar backgroundColor={colors['background-header']} barStyle='light-content' />
			<MultiMemberComponent conv={conv} />
		</Layout>
	)
}
