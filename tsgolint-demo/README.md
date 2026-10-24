# tsgolint-demo

A small Worker whose lint rules need TypeScript type information. `npm run lint`
runs `oxlint --type-aware --type-check`, which hands the configured
`typescript/*` rules and the compiler's own diagnostics to tsgolint.

`src/prewarm.ts` deliberately leaves one promise unhandled. The
`no-floating-promises` rule is set to warn, so lint passes and still prints a
diagnostic that syntax alone cannot produce.

```sh
npm ci
npm run lint
```
