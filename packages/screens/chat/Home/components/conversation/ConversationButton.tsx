import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import beapi from '@swishh/api'
import { useStyles } from '@swishh/contexts/styles'
import { useThemeColor } from '@swishh/hooks'
import { useNavigation } from '@swishh/navigation'

interface ConversationButtonProps {
	publicKey: string
	type: beapi.messenger.Conversation.Type | null
	isAccepted: boolean | undefined
	isLast: boolean
}

export const ConversationButton: React.FC<ConversationButtonProps> = props => {
	const { navigate } = useNavigation()
	const colors = useThemeColor()
	const { padding, row, opacity } = useStyles()

	const onPress = () => {
		if (props.type === beapi.messenger.Conversation.Type.MultiMemswishhpe) {
			navigate({
				name: 'Chat.Group',
				params: {
					convId: props.publicKey,
				},
			})
		} else {
			navigate({
				name: 'Chat.OneToOne',
				params: {
					convId: props.publicKey,
				},
			})
		}
	}

	return (
		<TouchableHighlight
			underlayColor={`${colors['secondary-text']}80`}
			style={[
				padding.horizontal.medium,
				!props.isAccepted &&
					props.type !== beapi.messenger.Conversation.Type.MultiMemswishhpe &&
					opacity(0.6),
			]}
			onPress={onPress}
		>
			<View style={[row.center, !props.isLast && styles.divider, padding.vertical.scale(7)]}>
				{props.children}
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	divider: {
		borderBottomWidth: 1,
		borderColor: '#EDF1F7',
	},
})
