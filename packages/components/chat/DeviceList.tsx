import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import beapi from '@swishh/api'
import { ButtonDropDown } from '@swishh/components/shared-components'
import { useStyles } from '@swishh/contexts/styles'
import { useMessengerClient } from '@swishh/hooks'
import { getDevicesForConversationAndMember } from '@swishh/utils/messenger/devices'
import { getSharedPushTokensForConversation } from '@swishh/utils/notification/notif-push'

const UserDevicesList: React.FC<{ memberPk: string; conversationPk: string }> = ({
	memberPk,
	conversationPk,
}) => {
	const cutoff = 16
	const { padding } = useStyles()
	const { t } = useTranslation()
	const [tokens, setTokens] = useState<beapi.messenger.ISharedPushToken[]>([])
	const [devices, setDevices] = useState<beapi.messenger.IDevice[]>([])
	const messengerClient = useMessengerClient()

	useEffect(() => {
		if (!messengerClient) {
			return
		}

		getSharedPushTokensForConversation(messengerClient, conversationPk)
			.then(setTokens)
			.catch(console.warn)
	}, [conversationPk, messengerClient, setTokens])

	useEffect(() => {
		if (!messengerClient) {
			return
		}

		getDevicesForConversationAndMember(messengerClient, conversationPk, memberPk).then(setDevices)
	}, [conversationPk, messengerClient, memberPk, setDevices])

	const tokensMap = Object.fromEntries(tokens.map(t => [t.devicePublicKey, t.token]))

	return (
		<>
			{devices.map((m, key) => {
				return (
					<View
						key={key}
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<View
							style={[
								padding.top.small,
								{
									alignSelf: 'flex-start',
								},
							]}
						/>

						<ButtonDropDown
							title={m?.publicKey?.substring(0, cutoff) || ''}
							body={
								tokensMap[m?.publicKey || '']
									? [
											t('chat.devices.push.enabled'),
											(tokensMap[m?.publicKey || ''] || '').substring(0, cutoff),
									  ].join(' ')
									: t('chat.devices.push.not-enabled')
							}
						/>
					</View>
				)
			})}
		</>
	)
}

export default UserDevicesList
