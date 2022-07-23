import { Icon } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar, View } from 'react-native'

import { HorizontalDuo, PrimaryAltButton, SecondaryAltButton } from '@swishh/components'
import OnboardingWrapper from '@swishh/components/onboarding/OnboardingWrapper'
import { UnifiedText } from '@swishh/components/shared-components/UnifiedText'
import { useAppDimensions } from '@swishh/contexts/app-dimensions.context'
import { useStyles } from '@swishh/contexts/styles'
import { useNotificationsInhibitor, useThemeColor } from '@swishh/hooks'
import { ScreenFC, useNavigation } from '@swishh/navigation'

const CustomModeBody: React.FC = () => {
	const { goBack } = useNavigation()
	const colors = useThemeColor()
	const { padding, border, margin, text } = useStyles()
	const { scaleSize } = useAppDimensions()
	const { navigate } = useNavigation()
	const { t } = useTranslation()

	return (
		<View style={[{ flex: 1 }]}>
			<LottieView
				source={require('@swishh/assets/lottie/Swishh_onboard_animation_assets2/Startup animation assets/Swishh BG.json')}
				autoPlay
				loop
				style={{ width: '100%', position: 'absolute' }}
			/>
			<LottieView
				source={require('@swishh/assets/lottie/Swishh_onboard_animation_assets2/Startup animation assets/Shield appear.json')}
				autoPlay
				loop={false}
				style={{ position: 'absolute', top: -20, width: '100%' }}
			/>
			<View
				style={[
					padding.horizontal.medium,
					{ flex: 1, top: -(30 * scaleSize), justifyContent: 'flex-end' },
				]}
			>
				<View
					style={[
						border.shadow.large,
						padding.medium,
						border.radius.medium,
						{ backgroundColor: colors['main-background'], shadowColor: colors.shadow },
					]}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<Icon
							style={[margin.right.small]}
							name='info'
							pack='feather'
							width={23}
							fill={colors['background-header']}
						/>
						<UnifiedText
							style={[
								text.bold,
								{
									color: colors['background-header'],
									fontSize: 24 * scaleSize,
								},
							]}
						>
							{t('onboarding.custom-mode.summary.title')}
						</UnifiedText>
					</View>
					<View style={[margin.top.medium]}>
						<UnifiedText style={[text.bold, { textAlign: 'center' }]}>
							{t('onboarding.custom-mode.summary.subtitle')}
						</UnifiedText>
					</View>
					<View style={[margin.top.medium]}>
						<UnifiedText style={{ textAlign: 'center' }}>
							{t('onboarding.custom-mode.summary.first-point')}
						</UnifiedText>
					</View>
					<View style={[margin.top.medium]}>
						<UnifiedText style={[{ textAlign: 'center' }]}>
							{t('onboarding.custom-mode.summary.second-point')}
						</UnifiedText>
					</View>
				</View>
				<View
					style={[
						margin.top.small,
						margin.bottom.medium,
						{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						},
					]}
				>
					<HorizontalDuo>
						<SecondaryAltButton onPress={goBack}>
							{t('onboarding.custom-mode.summary.back-button')}
						</SecondaryAltButton>
						<PrimaryAltButton onPress={() => navigate('Onboarding.CustomModeSettings')}>
							{t('onboarding.custom-mode.summary.accept-button')}
						</PrimaryAltButton>
					</HorizontalDuo>
				</View>
			</View>
		</View>
	)
}

export const CustomMode: ScreenFC<'Onboarding.CustomMode'> = () => {
	useNotificationsInhibitor(() => true)
	const colors = useThemeColor()

	return (
		<OnboardingWrapper>
			<StatusBar backgroundColor={colors['background-header']} barStyle='light-content' />
			<CustomModeBody />
		</OnboardingWrapper>
	)
}
