import { v4 as uuidv4 } from 'uuid'

import { EventType } from './event-type'
import { getRequestIdSqs } from './get-request-id-sqs'
import { getRequestIdHttp } from './get-request-id-http'

/**
 * Get the reqId from a lambda event
 * @private
 *
 * @param {Object} event - Lambda event
 *
 * @returns {string|undefined} - The reqId if it exists, undefined otherwise
 */
export function getRequestId(...args) {
  const reqId = getRequestIdForEvent(...args)
  return reqId || uuidv4()
}

function getRequestIdForEvent({ event, eventType }) {
  if (eventType === EventType.sqs) return getRequestIdSqs(event)
  if (eventType === EventType.apiGatewayAwsProxy) return getRequestIdHttp(event)
  if (eventType === EventType.apiGatewayLambdaIntegration) {
    return getRequestIdHttp(event)
  }
  if (eventType === EventType.lambda) return event.reqId
  throw new Error('The event type provided is not supported')
}
