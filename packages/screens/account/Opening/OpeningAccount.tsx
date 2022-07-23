import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { StreamProgress } from '@swishh/components'
import { LoaderDots } from '@swishh/components/LoaderDots'
import { StatusBarPrimary } from '@swishh/components/StatusBarPrimary'
import { EventEmitterContext } from '@swishh/contexts/eventEmitter.context'
import { useAppDispatch, useAppSelector } from '@swishh/hooks'
import { ScreenFC, useNavigation } from '@swishh/navigation'
import { selectStreamProgress } from '@swishh/redux/reducers/ui.reducer'
import { openAccount } from '@swishh/utils/accounts'
import { openClients } from '@swishh/utils/messenger/clients'

import { prepareAccount } from './prepareAccount.effect'

export const OpeningAccount: ScreenFC<'Account.Opening'> = ({
	route: {
		params: { selectedAccount, isNewAccount = false },
	},
}) => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation()
	const { t } = useTranslation()
	const eventEmitter = useContext(EventEmitterContext)

	const streamProgress = useAppSelector(selectStreamProgress)

	React.useEffect(() => {
		const f = async () => {
			// open account
			await openAccount(selectedAccount, dispatch)

			// opening messenger and protocol clients
			await openClients(eventEmitter, dispatch)

			// call thunk function prepareAccount
			dispatch(prepareAccount({ navigation, t, selectedAccount, isNewAccount }))
		}

		f()
	}, [dispatch, eventEmitter, isNewAccount, navigation, selectedAccount, t])

	return (
		<>
			<StatusBarPrimary />
			{streamProgress ? <StreamProgress /> : <LoaderDots />}
		</>
	)
}
