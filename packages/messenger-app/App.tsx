import { NavigationContainer } from '@react-navigation/native'
import { IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as Font from 'expo-font'
import React from 'react'
import { Platform, View } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'

import BoldOpenSans from '@swishh/assets/font/OpenSans-Bold.ttf'
import LightOpenSans from '@swishh/assets/font/OpenSans-Light.ttf'
import LightItalicOpenSans from '@swishh/assets/font/OpenSans-LightItalic.ttf'
import RegularOpenSans from '@swishh/assets/font/OpenSans-Regular.ttf'
import SemiBoldOpenSans from '@swishh/assets/font/OpenSans-SemiBold.ttf'
import SemiBoldItalicOpenSans from '@swishh/assets/font/OpenSans-SemiBoldItalic.ttf'
import { ErrorScreen } from '@swishh/components/error'
import { MusicPlayerProvider } from '@swishh/contexts/musicPlayer.context'
import NotificationProvider from '@swishh/contexts/notification.context'
import { PermissionsProvider } from '@swishh/contexts/permissions.context'
import { AppDimensionsProvider, StyleProvider } from '@swishh/contexts/styles'
import { UIKittenProvider } from '@swishh/contexts/uiKitten.context'
import { useMountEffect, useThemeColor } from '@swishh/hooks'
import { isReadyRef, navigationRef } from '@swishh/navigation'
import { Navigation } from '@swishh/navigation/stacks'
import reduxStore from '@swishh/redux/store'

import { CustomIconsPack } from './custom-icons'
import { FeatherIconsPack } from './feather-icons'

const BootSplashInhibitor: React.FC = () => {
	useMountEffect(() => {
		RNBootSplash.hide({ fade: true })
	})

	return <></>
}

const Background: React.FC = ({ children }) => {
	const colors = useThemeColor()
	return <View style={{ flex: 1, backgroundColor: colors['main-background'] }}>{children}</View>
}

// load Open Sans font for web
const useFonts = () => {
	const [isFontLoaded, setIsFontLoaded] = React.useState(false)

	const loadFontAsync = React.useCallback(async () => {
		try {
			await Font.loadAsync({
				'Bold Open Sans': {
					uri: BoldOpenSans,
					display: Font.FontDisplay.SWAP,
				},
				'Light Open Sans': {
					uri: LightOpenSans,
					display: Font.FontDisplay.SWAP,
				},
				'Light Italic Open Sans': {
					uri: LightItalicOpenSans,
					display: Font.FontDisplay.SWAP,
				},
				'Open Sans': {
					uri: SemiBoldOpenSans,
					display: Font.FontDisplay.SWAP,
				},
				'Italic Open Sans': {
					uri: SemiBoldItalicOpenSans,
					display: Font.FontDisplay.SWAP,
				},
				'Regular Open Sans': {
					uri: RegularOpenSans,
					display: Font.FontDisplay.SWAP,
				},
			})
			setIsFontLoaded(true)
		} catch (error) {
			console.log('Font Load Error:', error)
		}
	}, [])

	useMountEffect(() => {
		loadFontAsync()
	})

	return {
		isFontLoaded,
	}
}

const App: React.FC = () => {
	const { isFontLoaded } = useFonts()

	useMountEffect(() => {
		return () => {
			isReadyRef.current = false
		}
	})

	if (!isFontLoaded) {
		return null
	}

	return (
		<SafeAreaProvider>
			<AppDimensionsProvider>
				<StyleProvider>
					<ReduxProvider store={reduxStore}>
						<IconRegistry icons={[EvaIconsPack, FeatherIconsPack, CustomIconsPack]} />
						<UIKittenProvider>
							<Background>
								<ErrorScreen>
									<NavigationContainer
										ref={navigationRef}
										onReady={() => {
											isReadyRef.current = true
										}}
									>
										<PermissionsProvider>
											<NotificationProvider>
												{Platform.OS !== 'web' ? <BootSplashInhibitor /> : null}
												<MusicPlayerProvider>
													<Navigation />
												</MusicPlayerProvider>
											</NotificationProvider>
										</PermissionsProvider>
									</NavigationContainer>
								</ErrorScreen>
							</Background>
						</UIKittenProvider>
					</ReduxProvider>
				</StyleProvider>
			</AppDimensionsProvider>
		</SafeAreaProvider>
	)
}

export default App
