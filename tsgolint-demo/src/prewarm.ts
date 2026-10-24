// Left as a warning on purpose, so the lint stage shows a diagnostic that only
// type information can produce: nothing in this file's syntax says that
// `kv.put` returns a promise.
export function prewarm(kv: KVNamespace, paths: string[]): void {
  for (const path of paths) {
    kv.put(path, "0");
  }
}
