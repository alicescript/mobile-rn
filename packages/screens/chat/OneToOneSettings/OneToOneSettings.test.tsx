import { getFirstOneToOneConv } from '@swishh/utils/testing/helpers'
import { mockServices } from '@swishh/utils/testing/mockServices.test'
import { renderScreen } from '@swishh/utils/testing/renderScreen.test'

import { OneToOneSettings } from './OneToOneSettings'

test('Chat.OneToOneSettings renders correctly', async () => {
	await mockServices()

	const conv = getFirstOneToOneConv()

	const { toJSON } = renderScreen('Chat.OneToOneSettings', OneToOneSettings, {
		convId: conv?.publicKey || '',
	})
	expect(toJSON()).toMatchSnapshot()
})
