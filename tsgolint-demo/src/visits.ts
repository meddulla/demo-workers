export async function readVisits(kv: KVNamespace, path: string): Promise<number> {
  return Number((await kv.get(path)) ?? 0);
}

export async function recordVisit(kv: KVNamespace, path: string): Promise<void> {
  const visits = await readVisits(kv, path);
  await kv.put(path, String(visits + 1));
}
