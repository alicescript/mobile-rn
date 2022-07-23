import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { DividerItem, MenuItemWithIcon, ItemSection } from '@swishh/components'
import { useAppDimensions } from '@swishh/contexts/app-dimensions.context'
import { useThemeColor } from '@swishh/hooks'
import { ScreenFC, useNavigation } from '@swishh/navigation'

export const AboutSwishh: ScreenFC<'Settings.AboutSwishh'> = () => {
	const { scaleSize } = useAppDimensions()
	const colors = useThemeColor()
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
					<MenuItemWithIcon
						iconName='question-mark-circle-outline'
						onPress={() => navigate('Settings.Faq')}
					>
						{t('settings.about.faq-button')}
					</MenuItemWithIcon>
					<DividerItem />
					<MenuItemWithIcon iconName='map-outline' onPress={() => navigate('Settings.Roadmap')}>
						{t('settings.about.roadmap-button')}
					</MenuItemWithIcon>
					<DividerItem />
					<MenuItemWithIcon
						iconName='lock-outline'
						onPress={() => navigate('Settings.PrivacyPolicy')}
					>
						{t('settings.about.policy-button')}
					</MenuItemWithIcon>
					<DividerItem />
					<MenuItemWithIcon iconName='info-outline'>
						{t('settings.about.license-button')}
					</MenuItemWithIcon>
				</ItemSection>
			</ScrollView>
		</View>
	)
}
