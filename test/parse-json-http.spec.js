import test from 'ava'

import { getJsonFixture } from '../fixtures'
import { parseJsonHttpEvent } from '../lib/parser'

test('should successfully parse POST http event', async (t) => {
  const event = await getJsonFixture('http-event.json')

  const result = parseJsonHttpEvent(event)

  t.snapshot(result, 'POST Event')
})

test('should successfully parse when there are no path parameters', async (t) => {
  const event = await getJsonFixture('http-event.json')

  const updatedEvent = {
    ...event,
    pathParameters: null
  }

  const result = parseJsonHttpEvent(updatedEvent)

  t.snapshot(result, 'No path parameters Event')
})

test('should successfully parse when there are no query string parameters', async (t) => {
  const event = await getJsonFixture('http-event.json')

  const updatedEvent = {
    ...event,
    multiValueQueryStringParameters: null
  }

  const result = parseJsonHttpEvent(updatedEvent)

  t.snapshot(result, 'No query string parameters Event')
})

test('should successfully parse PUT http event', async (t) => {
  const event = await getJsonFixture('http-event.json')

  const putEvent = {
    ...event,
    httpMethod: 'PUT'
  }

  const result = parseJsonHttpEvent(putEvent)

  t.snapshot(result, 'PUT Event')
})

test('should successfully parse PATCH http event', async (t) => {
  const event = await getJsonFixture('http-event.json')

  const patchEvent = {
    ...event,
    httpMethod: 'PATCH'
  }

  const result = parseJsonHttpEvent(patchEvent)

  t.snapshot(result, 'PATCH Event')
})

test('should provide empty object body if method is GET', async (t) => {
  const event = await getJsonFixture('http-event.json')

  const getEvent = {
    ...event,
    httpMethod: 'GET'
  }

  const result = parseJsonHttpEvent(getEvent)

  t.snapshot(result, 'GET Event with empty object body')
})
