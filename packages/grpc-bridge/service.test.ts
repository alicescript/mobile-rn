import 'react-native'
import beapi from '@swishh/api'

import rpcNoop from './rpc/rpc.noop'
import { createServiceClient } from './service'

it('can create a client from a swishh api object', async () => {
	await createServiceClient(beapi.account.AccountService, rpcNoop)
})
