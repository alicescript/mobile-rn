import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { LargeInputWithIcon } from '@swishh/components'
import SwiperCard from '@swishh/components/onboarding/SwiperCard'
import { useStyles } from '@swishh/contexts/styles'
import { useAccount } from '@swishh/hooks'
import { useNavigation } from '@swishh/navigation'
import { storageSet } from '@swishh/utils/accounts/accountClient'
import { GlobalPersistentOptionsKeys } from '@swishh/utils/global-persistent-options/types'

export const CreateAccountBox: React.FC<{
	defaultName: string
}> = ({ defaultName }) => {
	const [name, setName] = React.useState(defaultName || '')
	const { margin } = useStyles()
	const { t } = useTranslation()
	const { navigate } = useNavigation()
	const account = useAccount()

	return (
		<SwiperCard
			title={t('onboarding.create-account.title')}
			button={{
				text: t('onboarding.create-account.first-button'),
				onPress: async () => {
					const displayName = name || `anon#${account.publicKey?.substring(0, 4)}`
					await storageSet(GlobalPersistentOptionsKeys.DisplayName, displayName)
					navigate('Onboarding.DefaultMode')
				},
			}}
			secondButton={{
				text: t('onboarding.create-account.second-button'),
				onPress: async () => {
					const displayName = name || `anon#${account.publicKey?.substring(0, 4)}`
					await storageSet(GlobalPersistentOptionsKeys.DisplayName, displayName)
					navigate('Onboarding.CustomMode')
				},
			}}
		>
			<View style={[margin.top.medium]}>
				<LargeInputWithIcon
					value={name}
					onChangeText={setName}
					placeholder={t('onboarding.create-account.placeholder')}
					iconName='person-outline'
				/>
			</View>
		</SwiperCard>
	)
}
