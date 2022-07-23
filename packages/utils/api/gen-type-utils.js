import pb from '@swishh/api/root.pb'

const enumMapping = (name, enumType, prefix, resolvedPrefix = '') => {
	const enumTypeParts = enumType.split('.')
	if (enumTypeParts.length < 2) {
		throw new Error('invalid enumType')
	}
	const enumName = enumTypeParts[enumTypeParts.length - 1]
	console.log(`\nexport type ${name}<T> =`)
	Object.entries(pb.lookup(enumType).values).forEach(([key, val]) => {
		let t = 'undefined'
		if (val !== 0) {
			t = `${prefix}.I${resolvedPrefix}${key.substr(enumName.length)}`
		}
		console.log(`T extends ${prefix}.${enumName}.${key} ? ${t} :`)
	})
	console.log('never')
}

console.log("import beapi from '@swishh/api'")

enumMapping(
	'StreamEventPayloadType',
	'swishh.messenger.v1.StreamEvent.Type',
	'beapi.messenger.StreamEvent',
)
enumMapping(
	'StreamEventNotifiedPayloadType',
	'swishh.messenger.v1.StreamEvent.Notified.Type',
	'beapi.messenger.StreamEvent.Notified',
)
enumMapping(
	'AppMessagePayloadType',
	'swishh.messenger.v1.AppMessage.Type',
	'beapi.messenger.AppMessage',
)
enumMapping(
	'MonitorGroupPayloadType',
	'swishh.protocol.v1.MonitorGroup.TypeEventMonitor',
	'beapi.protocol.MonitorGroup',
	'EventMonitor',
)

console.log('')

Object.entries(pb.lookup('swishh.messenger.v1.AppMessage.Type').values).forEach(([key, val]) => {
	if (val === 0) {
		console.log(`export type Interaction${key} =`)
		console.log(`{ type: beapi.messenger.AppMessage.Type.${key},`)
		console.log('payload?: undefined,')
	} else {
		console.log(`export type Interaction${key.substr('Type'.length)} =`)
		console.log(`{ type: beapi.messenger.AppMessage.Type.${key},`)
		console.log(`payload?: beapi.messenger.AppMessage.I${key.substr('Type'.length)},`)
	}
	console.log("} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>")
})

console.log('\nexport type ParsedInteraction =')
Object.entries(pb.lookup('swishh.messenger.v1.AppMessage.Type').values).forEach(([key, val]) => {
	if (val === 0) {
		console.log(`| Interaction${key}`)
	} else {
		console.log(`| Interaction${key.substr('Type'.length)}`)
	}
})
