import React from 'react'

import { StreamProgress } from '@swishh/components'
import { StatusBarPrimary } from '@swishh/components/StatusBarPrimary'
import { useAppDispatch } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'
import { closeAccount } from '@swishh/utils/accounts'

export const ClosingAccount: ScreenFC<'Account.Closing'> = ({
	route: {
		params: { callback },
	},
}) => {
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		const f = async () => {
			await closeAccount(dispatch)
			callback()
		}

		f()
	}, [callback, dispatch])

	return (
		<>
			<StatusBarPrimary />
			<StreamProgress />
		</>
	)
}
