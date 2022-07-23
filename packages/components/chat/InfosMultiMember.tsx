import React from 'react'
import { View } from 'react-native'

import beapi from '@swishh/api'
import { ChatDate } from '@swishh/components/chat/ChatDate'
import { MessageSystemWrapper } from '@swishh/components/chat/message/MessageSystemWrapper'
import { useStyles } from '@swishh/contexts/styles'
import { useThemeColor } from '@swishh/hooks'

import { UnifiedText } from '../shared-components/UnifiedText'

export const InfosMultiMember: React.FC<beapi.messenger.IConversation> = ({
	createdDate: createdDateStr,
}) => {
	const { margin, text, flex } = useStyles()
	const colors = useThemeColor()
	const createdDate = parseInt(createdDateStr as unknown as string, 10)
	const textColor = colors['background-header']
	return (
		<View style={[flex.align.center, flex.justify.center]}>
			<ChatDate date={createdDate} />
			<MessageSystemWrapper styleContainer={[margin.top.large, margin.bottom.medium]}>
				<UnifiedText style={[text.align.center, { color: textColor }]}>
					Group joined! 👍
				</UnifiedText>
			</MessageSystemWrapper>
		</View>
	)
}
