import { test, expect } from "bun:test"
import { Session } from "../../src/session/index"
import { Instance } from "../../src/project/instance"
import { Bus } from "../../src/bus"
import { tmpdir } from "../fixture/fixture"

test("emits session.started event on session creation", async () => {
  const tmp = await tmpdir({ git: true })
  await Instance.provide({
    directory: tmp.path,
    fn: async () => {
      let started = false
      Bus.subscribe(Session.Event.Started, (event) => {
        started = true
        expect(event.properties.info).toBeTruthy()
        expect(event.properties.info.id).toBeDefined()
      })
      await Session.create({})
      expect(started).toBe(true)
    },
  })
})
