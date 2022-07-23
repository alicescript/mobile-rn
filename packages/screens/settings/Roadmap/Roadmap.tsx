import { Layout } from '@ui-kitten/components'
import React from 'react'
import { StatusBar } from 'react-native'

import { WebViews } from '@swishh/components/shared-components'
import { useThemeColor } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'

const RoadmapURL = 'https://guide.swishh.tech/roadmap'

export const Roadmap: ScreenFC<'Settings.Roadmap'> = () => {
	const colors = useThemeColor()

	return (
		<Layout style={{ flex: 1, backgroundColor: colors['main-background'] }}>
			<StatusBar barStyle='light-content' />
			<WebViews url={RoadmapURL} />
		</Layout>
	)
}
