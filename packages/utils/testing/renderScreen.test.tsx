import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React, { ComponentProps } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { UIKittenProvider } from '@swishh/contexts/uiKitten.context'
import { CustomIconsPack } from '@swishh/messenger-app/custom-icons'
import { FeatherIconsPack } from '@swishh/messenger-app/feather-icons'
import { isReadyRef, navigationRef } from '@swishh/navigation/rootRef'
import { ScreenFC, ScreensParams } from '@swishh/navigation/types'
import store from '@swishh/redux/store'

const testNavigationProps = <N extends keyof ScreensParams>(
	name: N,
	params?: Readonly<ScreensParams[N]>,
) => {
	const navigation: ComponentProps<ScreenFC<N>>['navigation'] = {
		navigate: jest.fn(),
		dispatch: jest.fn(),
		reset: jest.fn(),
		goBack: jest.fn(),
		isFocused: jest.fn(),
		canGoBack: jest.fn(),
		getState: jest.fn(),
		getParent: jest.fn(),
		setParams: jest.fn(),
		setOptions: jest.fn(),
		addListener: jest.fn(),
		removeListener: jest.fn(),
		replace: jest.fn(),
		push: jest.fn(),
		pop: jest.fn(),
		popToTop: jest.fn(),
	}

	// don't know why we have to cast be it shouldn't be harmful
	const route: ComponentProps<ScreenFC<N>>['route'] =
		params === undefined
			? ({ key: name, name } as ComponentProps<ScreenFC<N>>['route'])
			: {
					key: name,
					name: name as Extract<N, string>,
					params,
			  }

	return { navigation, route }
}

const TestProvider: React.FC = ({ children }) => {
	return (
		<SafeAreaProvider
			initialMetrics={{
				frame: { x: 0, y: 0, width: 0, height: 0 },
				insets: { top: 0, left: 0, right: 0, bottom: 0 },
			}}
		>
			<Provider store={store}>
				<IconRegistry icons={[EvaIconsPack, FeatherIconsPack, CustomIconsPack]} />
				<UIKittenProvider>
					<NavigationContainer
						ref={navigationRef}
						onReady={() => {
							isReadyRef.current = true
						}}
					>
						{children}
					</NavigationContainer>
				</UIKittenProvider>
			</Provider>
		</SafeAreaProvider>
	)
}

export const renderScreen = <N extends keyof ScreensParams>(
	name: N,
	Screen: ScreenFC<N>,
	params?: Readonly<ScreensParams[N]>,
) => {
	return render(
		<TestProvider>
			<Screen {...testNavigationProps(name, params)} />
		</TestProvider>,
	)
}
