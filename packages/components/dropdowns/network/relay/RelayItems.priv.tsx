import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { BottomModal } from '@swishh/components'
import { DividerItem } from '@swishh/components/items'
import { AccordionAdd } from '@swishh/components/modals/AccordionAdd.modal'
import { AccordionEdit } from '@swishh/components/modals/AccordionEdit.modal'
import { useAppDispatch, useAppSelector } from '@swishh/hooks'
import {
	addToStaticRelay,
	modifyFromStaticRelay,
	removeFromStaticRelay,
	selectStaticRelay,
	toggleFromStaticRelay,
} from '@swishh/redux/reducers/networkConfig.reducer'

import { AddButtonPriv } from '../AddButton.priv'
import { MenuToggleWithEditPriv } from '../MenuToggleWithEdit.priv'

export const RelayItemsPriv = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const staticRelay = useAppSelector(selectStaticRelay)
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isEdit, setIsEdit] = useState<{
		alias: string
		url: string
	} | null>(null)

	return (
		<>
			{(staticRelay || []).map(({ alias, url, isEnabled, isEditable }, index) => (
				<View key={`relay-item-${index}`}>
					<DividerItem />
					<MenuToggleWithEditPriv
						isToggleOn={isEnabled}
						onPress={() => dispatch(toggleFromStaticRelay(url))}
						onPressModify={
							isEditable
								? () => {
										setIsVisible(true)
										setIsEdit({ alias: alias || '', url })
								  }
								: undefined
						}
					>
						{alias}
					</MenuToggleWithEditPriv>
				</View>
			))}
			<DividerItem />
			<AddButtonPriv onPress={() => setIsVisible(true)} />
			<BottomModal isVisible={isVisible} setIsVisible={setIsVisible}>
				{isEdit ? (
					<AccordionEdit
						title={t('onboarding.custom-mode.settings.modals.edit.title.relay')}
						onEdit={data => {
							dispatch(modifyFromStaticRelay({ url: isEdit.url, changes: data }))
							setIsVisible(false)
						}}
						onDelete={() => {
							dispatch(removeFromStaticRelay(isEdit.url))
							setIsVisible(false)
						}}
						defaultAlias={isEdit.alias}
						defaultUrl={isEdit.url}
						alreadyExistingUrls={staticRelay
							.map(({ url }) => url)
							.filter((url): url is string => url !== undefined)}
						alreadyExistingAliases={staticRelay
							.map(({ alias }) => alias)
							.filter((alias): alias is string => alias !== undefined)}
					/>
				) : (
					<AccordionAdd
						title={t('onboarding.custom-mode.settings.modals.add.title.relay')}
						onSubmit={data => {
							dispatch(addToStaticRelay(data))
							setIsVisible(false)
						}}
						alreadyExistingAliases={staticRelay
							.map(({ alias }) => alias)
							.filter((alias): alias is string => alias !== undefined)}
						alreadyExistingUrls={staticRelay
							.map(({ url }) => url)
							.filter((url): url is string => url !== undefined)}
					/>
				)}
			</BottomModal>
		</>
	)
}
