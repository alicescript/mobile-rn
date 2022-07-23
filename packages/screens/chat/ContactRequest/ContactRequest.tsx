import React from 'react'

import { useStyles } from '@swishh/contexts/styles'
import { swishhMethodsHooks, useThemeColor } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'

import { Request } from './components/Request'

//
// ContactRequest => Accept/Refuse
//

const useStylesContactRequest = () => {
	const { border, padding, margin, background } = useStyles()
	return {
		firstRequestButton: [
			border.color.light.grey,
			border.big,
			padding.vertical.small,
			border.radius.scale(6),
			margin.right.small,
		],
		secondRequestButton: [
			border.radius.scale(6),
			padding.vertical.small,
			margin.left.small,
			background.light.blue,
		],
	}
}

export const ContactRequest: ScreenFC<'Chat.ContactRequest'> = ({
	route: { params },
	navigation: { goBack },
}) => {
	const _styles = useStylesContactRequest()
	const colors = useThemeColor()
	const { call: accept } = swishhMethodsHooks.useContactAccept()
	return (
		<Request
			contactPublicKey={params.contactId}
			markAsVerified={false}
			blurAmount={10}
			buttons={[
				{
					action: () => {
						//params.decline({ id: params.id })
						//goBack()
					},
					style: _styles.firstRequestButton,
					title: 'REFUSE',
					titleColor: colors['secondary-text'],
					icon: 'close-outline',
					iconColor: colors['secondary-text'],
					disabled: true,
				},
				{
					action: () => {
						accept({ publicKey: params.contactId })
						goBack()
					},
					style: _styles.secondRequestButton,
					title: 'ACCEPT',
					titleColor: colors['background-header'],
					icon: 'checkmark-outline',
					iconColor: colors['background-header'],
				},
			]}
		/>
	)
}
