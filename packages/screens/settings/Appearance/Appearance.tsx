import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
// import { useSelector, useDispatch } from 'react-redux'

import { MenuItem, ItemSection } from '@swishh/components'
import { useAppDimensions } from '@swishh/contexts/app-dimensions.context'
import { useThemeColor } from '@swishh/hooks'
import { ScreenFC, useNavigation } from '@swishh/navigation'
// import { selectThemeIsDark, toggleDarkTheme } from '@swishh/redux/reducers/theme.reducer'

export const Appearance: ScreenFC<'Settings.Appearance'> = () => {
	const { scaleSize } = useAppDimensions()
	const colors = useThemeColor()
	// const isDark = useSelector(selectThemeIsDark)
	// const dispatch = useDispatch()
	const { navigate } = useNavigation()
	const { t } = useTranslation()

	return (
		<View style={{ backgroundColor: colors['secondary-background'], flex: 1 }}>
			<ScrollView
				bounces={false}
				contentContainerStyle={{ paddingBottom: 12 * scaleSize }}
				showsVerticalScrollIndicator={false}
			>
				<ItemSection>
					{/*
					<ButtonSettingV2
						text={t('settings.appearance.dark-button')}
						toggle={{
							enable: true,
							value: isDark,
							action: async () => {
								dispatch(toggleDarkTheme())
							},
						}}
					/>
					*/}
					{/* TODO: replace dark toggle by a menu or a radio button:  Light, Dark, System based*/}
					<MenuItem onPress={() => navigate('Settings.ThemeEditor')}>
						{t('settings.appearance.editor-button')}
					</MenuItem>
				</ItemSection>
			</ScrollView>
		</View>
	)
}
