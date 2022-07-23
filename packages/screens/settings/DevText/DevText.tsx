import React from 'react'
import { ScrollView } from 'react-native'

import { UnifiedText } from '@swishh/components/shared-components/UnifiedText'
import { ScreenFC } from '@swishh/navigation'

export const DevText: ScreenFC<'Settings.DevText'> = ({
	route: {
		params: { text },
	},
}) => {
	return (
		<ScrollView>
			<UnifiedText selectable={true}>{text}</UnifiedText>
		</ScrollView>
	)
}
