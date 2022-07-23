import React from 'react'
import { useTranslation } from 'react-i18next'

import { CenteredTextScreen } from '@swishh/components/account'
import { StatusBarPrimary } from '@swishh/components/StatusBarPrimary'
import { useCreateNewAccount } from '@swishh/hooks'
import { ScreenFC } from '@swishh/navigation'
import { accountClient } from '@swishh/utils/accounts/accountClient'

export const CreatingAccount: ScreenFC<'Account.Creating'> = () => {
	const createNewAccount = useCreateNewAccount()
	const { t } = useTranslation()

	React.useEffect(() => {
		const f = async () => {
			// with an empty accountId the function returns default config
			const defaultConfig = await accountClient.networkConfigGet({ accountId: '' })
			if (defaultConfig.currentConfig) {
				await createNewAccount(defaultConfig.currentConfig)
			}
		}

		f()
	}, [createNewAccount])

	return (
		<>
			<StatusBarPrimary />
			<CenteredTextScreen>{t('account.creating')}</CenteredTextScreen>
		</>
	)
}
