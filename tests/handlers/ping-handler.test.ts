import { test, expect, it } from "vitest";
import { handlerTester } from "../test-helper";
import { pingHandler } from "~/handlers/ping-handler";

test("ping-handler", () => {
  const { responseBody, responseStatus } = handlerTester(pingHandler, {
    method: "GET",
    url: "/ping",
    ip: "::1",
  });

  expect(responseStatus).toBe(200);

  let data = JSON.parse(responseBody);

  expect(data.requestIp).toBe("::1");

  // other pattern
  const { responseBody: responseBody2, responseStatus: responseStatus2 } =
    handlerTester(pingHandler, {
      method: "GET",
      url: "/ping",
      ip: "192.168.0.1",
    });

  expect(responseStatus2).toBe(200);

  data = JSON.parse(responseBody2);

  expect(data.requestIp).toBe("192.168.0.1");
});
