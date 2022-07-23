import { getFirstMultiMemberConv } from '@swishh/utils/testing/helpers'
import { mockServices } from '@swishh/utils/testing/mockServices.test'
import { renderScreen } from '@swishh/utils/testing/renderScreen.test'

import { MultiMemberQR } from './MultiMemberQR'
test('Chat.MultiMemberQR renders correctly', async () => {
	await mockServices()

	const conv = getFirstMultiMemberConv()

	const { toJSON } = renderScreen('Chat.MultiMemberQR', MultiMemberQR, {
		convId: conv?.publicKey || '',
	})
	expect(toJSON()).toMatchSnapshot()
})
