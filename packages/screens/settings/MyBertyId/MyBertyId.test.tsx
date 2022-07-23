import { fireEvent } from '@testing-library/react-native'
import i18next from 'i18next'

import { mockServices } from '@swishh/utils/testing/mockServices.test'
import { renderScreen } from '@swishh/utils/testing/renderScreen.test'

import { MySwishhId } from './MySwishhId'

test('Settings.MySwishhId renders correctly', async () => {
	await mockServices()

	const { toJSON, getByLabelText } = renderScreen('Settings.MySwishhId', MySwishhId)
	expect(toJSON()).toMatchSnapshot()

	const button = getByLabelText(i18next.t('tabs.fingerprint'))
	fireEvent.press(button)
	expect(toJSON()).toMatchSnapshot()
})
