import { getFirstMultiMemberConv } from '@swishh/utils/testing/helpers'
import { mockServices } from '@swishh/utils/testing/mockServices.test'
import { renderScreen } from '@swishh/utils/testing/renderScreen.test'

import { MultiMemberSettings } from './MultiMemberSettings'

test('Group.MultiMemberSettings renders correctly', async () => {
	await mockServices()

	const conv = getFirstMultiMemberConv()

	const { toJSON } = renderScreen('Group.MultiMemberSettings', MultiMemberSettings, {
		convId: conv?.publicKey || '',
	})
	expect(toJSON()).toMatchSnapshot()
})
