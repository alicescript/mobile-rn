/* eslint-disable no-undef */
import 'react-native'
import i18next from 'i18next'

import { initI18N } from '@swishh/i18n'

jest.mock('react-native-gesture-handler', () => {
	return {
		...jest.requireActual('react-native-gesture-handler/src/mocks'),
		LongPressGestureHandler: jest.fn,
		TouchableOpacity: jest.fn,
	}
})

initI18N()
i18next.changeLanguage('cimode')
