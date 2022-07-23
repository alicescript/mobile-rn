import pb from '@swishh/api/root.pb'

const uncap = str => str.slice(0, 1).toLowerCase() + str.slice(1)

console.log("import beapi from '@swishh/api'")

console.log("\nimport { UnaryType, RequestStreamType, ResponseStreamType } from './types'")

const services = [
	'swishh.protocol.v1.ProtocolService',
	'swishh.account.v1.AccountService',
	'swishh.messenger.v1.MessengerService',
	'swishh.bridge.v1.BridgeService',
]

console.log('\nexport type ServiceClientType<S> =')
for (const svcType of services) {
	const svc = pb.lookup(svcType)
	console.log(`S extends beapi.${svc.parent.parent.name}.${svc.name} ? Welsh${svc.name}Client :`)
}
console.log('never')

for (const svcType of services) {
	const svc = pb.lookup(svcType)
	console.log(`\nexport interface Welsh${svc.name}Client {`)
	Object.entries(svc.methods).forEach(([key, method]) => {
		console.log(uncap(key) + ': ')
		if (!method.requestStream && !method.responseStream) {
			// UNARY
			console.log(`UnaryType<beapi.${svc.parent.parent.name}.${svc.name}["${uncap(key)}"]>`)
			return
		}
		if (method.requestStream && !method.responseStream) {
			// REQUEST STREAM
			console.log(`RequestStreamType<beapi.${svc.parent.parent.name}.${svc.name}["${uncap(key)}"]>`)
			return
		}
		if (!method.requestStream && method.responseStream) {
			// RESPONSE STREAM
			console.log(
				`ResponseStreamType<beapi.${svc.parent.parent.name}.${svc.name}["${uncap(key)}"]>`,
			)
			return
		}
		// BIDI
		console.log('never')
	})
	console.log('}')
}
