import { default as pb } from './root.pb'

const account = pb.lookup('swishh.account.v1')
const bridge = pb.lookup('swishh.bridge.v1')
const messenger = pb.lookup('.swishh.messenger.v1')
const protocol = pb.lookup('.swishh.protocol.v1')
const push = pb.lookup('.swishh.push.v1')
const errcode = pb.lookup('.swishh.errcode')

export { account, bridge, messenger, protocol, push, errcode }

export default {
	account,
	bridge,
	messenger,
	protocol,
	push,
	errcode,
}
