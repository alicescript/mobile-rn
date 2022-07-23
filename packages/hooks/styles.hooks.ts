import { useAppDimensions } from '@swishh/contexts/app-dimensions.context'

export const useStylesSwishhId = ({
	iconIdSize = 45,
	iconShareSize = 26,
	titleSize = 26,
	contentScaleFactor = 0.66,
	avatarSize = 90,
}: {
	iconIdSize?: number
	iconShareSize?: number
	titleSize?: number
	contentScaleFactor?: number
	avatarSize?: number
}) => {
	const _iconIdSize = iconIdSize
	const _iconShareSize = iconShareSize
	const _titleSize = titleSize
	const swishhIdContentScaleFactor = contentScaleFactor
	const requestAvatarSize = avatarSize

	const { fontScale, scaleSize, windowHeight, windowWidth, isGteIpadSize } = useAppDimensions()
	const _swishhIdButtonSize = 60 * scaleSize

	// Make sure we can always see the whole QR code on the screen, even if need to scroll

	const qrCodeSize = isGteIpadSize
		? Math.min(windowHeight, windowWidth) * 0.3
		: Math.min(
				windowHeight * swishhIdContentScaleFactor,
				windowWidth * swishhIdContentScaleFactor,
		  ) -
		  1.25 * _titleSize

	return {
		qrCodeSize,
		swishhIdContentScaleFactor,
		iconShareSize: _iconShareSize * scaleSize,
		iconIdSize: _iconIdSize * scaleSize,
		titleSize: _titleSize * fontScale,
		requestAvatarSize,
		styleSwishhIdButton: {
			width: _swishhIdButtonSize,
			height: _swishhIdButtonSize,
			borderRadius: _swishhIdButtonSize / 2,
			marginRight: _swishhIdButtonSize,
			bottom: _swishhIdButtonSize / 2,
		},
		styleSwishhIdContent: { paddingBottom: _swishhIdButtonSize / 2 + 10 },
	}
}
