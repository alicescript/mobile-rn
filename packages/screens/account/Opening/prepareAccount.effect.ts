import { NavigationProp } from '@react-navigation/native'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TFunction } from 'react-i18next'
import { Platform } from 'react-native'

import beapi from '@swishh/api'
import { ServiceClientType } from '@swishh/grpc-bridge/welsh-clients.gen'
import { ScreensParams } from '@swishh/navigation/types'
import { selectConversationsDict, selectAccount } from '@swishh/redux/reducers/messenger.reducer'
import { resetTheme } from '@swishh/redux/reducers/theme.reducer'
import {
	selectMessengerClient,
	selectProtocolClient,
	setSelectedAccount,
} from '@swishh/redux/reducers/ui.reducer'
import { RootState } from '@swishh/redux/store'
import { storageGet, storageRemove } from '@swishh/utils/accounts/accountClient'
import { updateAccount } from '@swishh/utils/accounts/accountUtils'
import { GlobalPersistentOptionsKeys } from '@swishh/utils/global-persistent-options/types'
import { accountPushToggleState } from '@swishh/utils/notification/notif-push'

const closeConvos = async (
	messengerClient: ServiceClientType<beapi.messenger.MessengerService> | null,
	conversations: { [key: string]: beapi.messenger.IConversation | undefined },
) => {
	if (messengerClient === null) {
		console.warn('messenger client is null')
		return
	}

	for (const conv of Object.values(conversations).filter(conv => conv?.isOpen)) {
		messengerClient.conversationClose({ groupPk: conv?.publicKey }).catch(e => {
			console.warn(`failed to close conversation "${conv?.displayName}",`, e)
		})
	}
}

const updateAccountOnClients = async (
	messengerClient: ServiceClientType<beapi.messenger.MessengerService> | null,
	selectedAccount: string | null,
	account: beapi.messenger.IAccount | null | undefined,
) => {
	// remove the displayName value that was set at the creation of the account
	const displayName = await storageGet(GlobalPersistentOptionsKeys.DisplayName)
	await storageRemove(GlobalPersistentOptionsKeys.DisplayName)
	if (displayName) {
		// update account in messenger client
		await messengerClient?.accountUpdate({ displayName })
		// update account in account client
		await updateAccount({
			accountName: displayName,
			accountId: selectedAccount,
			publicKey: account?.publicKey,
		})
	}
}

// we create a thunk here to have the current store state after opening the account and clients while avoiding hacky effects
export const prepareAccount = createAsyncThunk(
	'account/prepared',
	async (
		arg: {
			navigation: NavigationProp<ScreensParams>
			t: TFunction<'translation', undefined>
			selectedAccount: string
			isNewAccount: boolean
		},
		{ dispatch, getState },
	) => {
		const { navigation, t, selectedAccount, isNewAccount } = arg
		// typing createAsyncThunk is a nightmare 👻
		const state: RootState = getState() as any
		const messengerClient = selectMessengerClient(state)
		const protocolClient = selectProtocolClient(state)
		const conversations = selectConversationsDict(state)
		const account = selectAccount(state)

		// messenger service keep conversations open on restart, so we close all after open app
		await closeConvos(messengerClient, conversations)

		dispatch(setSelectedAccount(selectedAccount))
		if (isNewAccount) {
			await updateAccountOnClients(messengerClient, selectedAccount, account)
			// reset ui theme
			dispatch(resetTheme())

			if (Platform.OS !== 'web') {
				// request push notifications
				await accountPushToggleState({
					account,
					messengerClient: messengerClient,
					protocolClient: protocolClient,
					navigate: navigation.navigate,
					t,
				})
			}

			navigation.reset({
				routes: [
					{
						name: 'Onboarding.SetupFinished',
					},
				],
			})
		} else {
			navigation.reset({
				routes: [
					{
						name: 'Chat.Home',
					},
				],
			})
		}
	},
)
