import React from 'react'

import { StreamProgress } from '@swishh/components'
import { StatusBarPrimary } from '@swishh/components/StatusBarPrimary'
import { useAppDispatch } from '@swishh/hooks'
import { ScreenFC, useNavigation } from '@swishh/navigation'
import { importAccount, refreshAccountList } from '@swishh/utils/accounts'

export const ImportingAccount: ScreenFC<'Account.Importing'> = ({
	route: {
		params: { filePath },
	},
}) => {
	const dispatch = useAppDispatch()
	const { reset } = useNavigation()

	React.useEffect(() => {
		const f = async () => {
			const resp = await importAccount(filePath, dispatch)
			if (!resp) {
				throw new Error('no account returned')
			}

			if (!resp.accountMetadata?.accountId) {
				throw new Error('no account id returned')
			}

			await refreshAccountList()
			reset({
				routes: [
					{ name: 'Account.Opening', params: { selectedAccount: resp.accountMetadata.accountId } },
				],
			})
		}

		f()
	}, [dispatch, reset, filePath])

	return (
		<>
			<StatusBarPrimary />
			<StreamProgress />
		</>
	)
}
