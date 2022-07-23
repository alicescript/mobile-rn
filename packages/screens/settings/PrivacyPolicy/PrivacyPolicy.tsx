import { Layout } from '@ui-kitten/components'
import React from 'react'
import { StatusBar } from 'react-native'

import { WebViews } from '@swishh/components/shared-components'
import { useThemeColor } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'

const PrivacyPolicyURL = 'https://swishh.tech/privacy-policy#'

export const PrivacyPolicy: ScreenFC<'Settings.PrivacyPolicy'> = () => {
	const colors = useThemeColor()

	return (
		<Layout style={{ flex: 1, backgroundColor: colors['main-background'] }}>
			<StatusBar barStyle='dark-content' />
			<WebViews url={PrivacyPolicyURL} />
		</Layout>
	)
}
