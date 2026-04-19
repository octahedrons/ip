# ip

A Cloudflare Worker displaying your IP address and reverse hostname.

## Setup

Install Node and dependencies:

    brew install node
    npm ci

## Development

Start a local dev server:

    npx wrangler dev

If using [a container](https://github.com/dentarg/ai):

    npx --yes wrangler dev --ip 0.0.0.0 --port 1337

A `.dev.vars` file is used to set development-only environment variables
(e.g. `DEV=true` to skip the URL shortener redirect). This file is
gitignored and not deployed. Create it with:

    echo "DEV=true" > .dev.vars

## Deploy

Deploy to Cloudflare:

    npx wrangler deploy

Deployments to production are also triggered automatically via GitHub
Actions on push to `main`.

## Format

Format the code with [Prettier]:

    npm run format

[Prettier]: https://prettier.io/
