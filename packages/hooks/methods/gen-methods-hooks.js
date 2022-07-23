import pb from '@swishh/api/root.pb'

console.log("import beapi from '@swishh/api'")

const methodsHooks = (name, svcType, prefix) => {
	const svc = pb.lookup(svcType)
	console.log(`export type ${name} = {`)
	Object.values(svc.methods).forEach(method => {
		if (method.requestStream || method.responseStream) {
			return
		}
		console.log(`use${method.name}: () => {
			error: any
			call: (req?: ${prefix}.${method.name}.IRequest) => void
			reply: ${prefix}.${method.name}.IReply | null
			done: boolean
			called: boolean
			loading: boolean
		},`)
	})
	console.log('}')
}

methodsHooks('MessengerMethodsHooks', 'swishh.messenger.v1.MessengerService', 'beapi.messenger')
methodsHooks('ProtocolMethodsHooks', 'swishh.protocol.v1.ProtocolService', 'beapi.protocol')
