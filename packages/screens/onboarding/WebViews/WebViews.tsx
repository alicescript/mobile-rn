import { Layout } from '@ui-kitten/components'
import React from 'react'
import { StatusBar } from 'react-native'

import { WebViews as SharedWebViews } from '@swishh/components/shared-components'
import { useThemeColor } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'

export const WebViews: ScreenFC<'Onboarding.WebViews'> = ({ route: { params } }) => {
	const { url } = params
	const colors = useThemeColor()

	return (
		<Layout style={{ flex: 1, backgroundColor: colors['main-background'] }}>
			<StatusBar barStyle='dark-content' />
			<SharedWebViews url={url} />
		</Layout>
	)
}
