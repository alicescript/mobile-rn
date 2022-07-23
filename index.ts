/**
 * @format
 */

import 'node-libs-react-native/globals'
import 'react-native-gesture-handler'
import 'string.fromcodepoint'

import protobuf from 'protobufjs'
import { AppRegistry, NativeModules } from 'react-native'

import { initI18N } from '@swishh/i18n'
import App from '@swishh/messenger-app/App'
import { name as appName } from '@swishh/messenger-app/app.json'
import BridgeLogger from '@swishh/native-modules/GoBridge/logger'

protobuf.util.toJSONOptions = { longs: String, enums: Number, json: true }

if (typeof Buffer === 'undefined') {
	global.Buffer = require('buffer').Buffer
}

if (!__DEV__) {
	global.console = BridgeLogger(NativeModules.GoBridge)
	global.console.info('native bridge logger enabled')
}

initI18N()

AppRegistry.registerComponent(appName, () => App)
