# Coin Flip

On-chain heads-or-tails game built on Stacks.

## Structure

- `contracts/coin-flip.clar` - Clarity contract
- `sdk/` - app-local SDK package
- `frontend/` - Next.js frontend
- `deploy.mjs` - mainnet deploy script with `ClarityVersion.Clarity2`

## Quick Start

```powershell
npm --prefix sdk run build
npm --prefix frontend install
npm --prefix frontend run build
```

Deploy with:

```powershell
$env:STACKS_PRIVATE_KEY='...'
node deploy.mjs
Remove-Item Env:STACKS_PRIVATE_KEY
```
