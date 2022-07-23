import React from 'react'

import { useThemeColor } from '@swishh/hooks'

import { ButtonDefProps } from '../../interfaces'
import { FloatingButtonPriv } from '../FloatingButton.priv'

export const PrimaryFloatingButton: React.FC<ButtonDefProps> = props => {
	const colors = useThemeColor()

	return <FloatingButtonPriv {...props} style={{ backgroundColor: colors['background-header'] }} />
}
