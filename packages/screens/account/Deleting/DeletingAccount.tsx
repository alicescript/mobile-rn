import React from 'react'
import { useTranslation } from 'react-i18next'

import { CenteredTextScreen } from '@swishh/components/account'
import { useDeleteAccount } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'

export const DeletingAccount: ScreenFC<'Account.Deleting'> = ({
	route: {
		params: { selectedAccount },
	},
}) => {
	const deleteAccount = useDeleteAccount()
	const { t } = useTranslation()

	React.useEffect(() => {
		const f = async () => {
			await deleteAccount(selectedAccount)
		}
		f()
	}, [deleteAccount, selectedAccount])

	return <CenteredTextScreen>{t('account.deleting')}</CenteredTextScreen>
}
