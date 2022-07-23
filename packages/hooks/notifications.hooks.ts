import { useAppDispatch } from '@swishh/hooks'
import { useNavigation } from '@swishh/navigation'
import {
	addNotificationInhibitor,
	removeNotificationInhibitor,
} from '@swishh/redux/reducers/ui.reducer'
import { NotificationsInhibitor } from '@swishh/utils/notification/notif-in-app'
import { Maybe } from '@swishh/utils/type/maybe'

import { useMountEffect } from './react.hooks'

export const useNotificationsInhibitor = (inhibitor: Maybe<NotificationsInhibitor>) => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation()
	useMountEffect(() => {
		if (!inhibitor) {
			return
		}

		const inhibit = () => dispatch(addNotificationInhibitor({ inhibitor }))
		const revert = () => dispatch(removeNotificationInhibitor({ inhibitor }))

		const unsubscribeBlur = navigation.addListener('blur', revert)
		const unsubscribeFocus = navigation.addListener('focus', inhibit)

		inhibit()

		return () => {
			unsubscribeFocus()
			unsubscribeBlur()
			revert()
		}
	})
}
