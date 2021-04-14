import { exec } from 'child_process'

// this required due to lerna's inability to handle additional args on npm clients.
exec(`npm config set legacy-peer-deps true`)

const packages = ['subscription', 'email', 'public']
packages.forEach((p) => exec(`cp -R protofiles ./packages/${p}`))
