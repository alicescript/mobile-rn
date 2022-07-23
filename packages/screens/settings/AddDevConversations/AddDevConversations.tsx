import { Layout } from '@ui-kitten/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, ScrollView } from 'react-native'

import {
	ButtonSetting,
	SettingButtonStateType,
} from '@swishh/components/shared-components/SettingsButtons'
import { globals } from '@swishh/config'
import { useStyles } from '@swishh/contexts/styles'
import { useThemeColor } from '@swishh/hooks'
import { ScreenFC, useNavigation } from '@swishh/navigation'

type ValueOf<T> = T[keyof T]

type ValueType = (
	| ValueOf<typeof globals.swishh.contacts>
	| ValueOf<typeof globals.swishh.conversations>
) & { kind: string }

const uncap = (s: string) => s[0].toLowerCase() + s.slice(1)

const Button: React.FC<ValueType> = ({ kind: rawKind, name, link }) => {
	const { t } = useTranslation()
	const colors = useThemeColor()
	const navigation = useNavigation()

	const kind = uncap(rawKind)

	/* Ignore check for i18n missing keys
			settings.add-dev-conversations.tag-bot
			settings.add-dev-conversations.tag-contact
			settings.add-dev-conversations.tag-conversation
	*/

	const state: SettingButtonStateType = ['bot', 'contact', 'conversation'].includes(kind)
		? {
				value: t(
					`settings.add-dev-conversations.tag-${kind as 'bot' | 'contact' | 'conversation'}`,
				),
				color: colors['background-header'],
				bgColor: colors['positive-asset'],
		  }
		: {
				value: 'unknown',
				color: colors['secondary-text'],
				bgColor: colors['main-background'],
		  }

	return (
		<ButtonSetting
			name={t('settings.add-dev-conversations.add', { name: name })}
			icon='book-outline'
			iconSize={30}
			iconColor={colors['alt-secondary-background-header']}
			actionIcon={null}
			state={state}
			onPress={() => {
				navigation.navigate('Chat.ManageDeepLink', { type: 'link', value: link })
			}}
		/>
	)
}

const BodyAddContactList = () => {
	const { padding, flex, margin } = useStyles()

	return (
		<View style={[padding.medium, flex.tiny, margin.bottom.small]}>
			{Object.values(globals.swishh.contacts).map(value => {
				return <Button key={value.link} {...value} />
			})}
			{Object.values(globals.swishh.conversations).map(value => {
				return <Button key={value.link} {...value} kind='Conversation' />
			})}
		</View>
	)
}

export const AddDevConversations: ScreenFC<'Settings.AddDevConversations'> = () => {
	const colors = useThemeColor()

	return (
		<Layout style={{ flex: 1, backgroundColor: colors['main-background'] }}>
			<ScrollView bounces={false}>
				<BodyAddContactList />
			</ScrollView>
		</Layout>
	)
}
