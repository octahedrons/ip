import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "./worker.js";

test("responds successfully without a User-Agent header", async t => {
  t.mock.method(globalThis, "fetch", async input => {
    const url = new URL(input instanceof Request ? input.url : input);
    if (url.hostname === "cloudflare-dns.com") {
      return Response.json({ Answer: [] });
    }
    if (url.hostname === "bgp.burd.se") {
      return Response.json({ name: "Example", href: "https://example.com" });
    }
    if (url.pathname === "/data/network-info/data.json") {
      return Response.json({ data: { prefix: "192.0.2.0/24" } });
    }
    if (url.pathname === "/data/rpki-validation/data.json") {
      return Response.json({ data: { status: "valid" } });
    }
    throw new Error(`Unexpected fetch: ${url}`);
  });

  const request = new Request("https://burd.se/ip", {
    headers: { "CF-Connecting-IP": "192.0.2.1" }
  });
  request.cf = { asn: 64500 };

  const response = await worker.fetch(request, {});

  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("Content-Type"),
    "text/html; charset=utf-8"
  );
  assert.match(await response.text(), /192\.0\.2\.1/);
});
