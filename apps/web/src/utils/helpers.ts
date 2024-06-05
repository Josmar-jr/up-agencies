export function createConst<T extends string>(type: { [K in T]: K }): { [K in T]: K } {
  const obj = {} as { [K in T]: K };
  for (const key in type) {
    obj[key] = key;
  }
  return obj;
}

export function generatesSelectable(obj: { [key: string]: string }) {
  return Object.entries(obj).map(([key, value]) => ({ label: value, value: key, disabled: false }));
}
