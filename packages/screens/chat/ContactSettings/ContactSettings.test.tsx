import { getFirstContact } from '@swishh/utils/testing/helpers'
import { mockServices } from '@swishh/utils/testing/mockServices.test'
import { renderScreen } from '@swishh/utils/testing/renderScreen.test'

import { ContactSettings } from './ContactSettings'

test('Chat.ContactSettings renders correctly', async () => {
	await mockServices()

	const contact = getFirstContact()

	const { toJSON } = renderScreen('Chat.ContactSettings', ContactSettings, {
		contactId: contact?.publicKey || '',
	})
	expect(toJSON()).toMatchSnapshot()
})
