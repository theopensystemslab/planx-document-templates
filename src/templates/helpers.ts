/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unsafe-assignment: "off" */
export function hasValue(data: object, path: string): boolean {
  const value: any = get({ data, path }) || false;
  return !!value;
}

export function getString(data: object, path: string): string {
  const value: any = get({ data, path }) ?? "";
  if (Array.isArray(value)) {
    return value[0] ? String(value[0]) : "";
  }
  return String(value);
}

export function getStrings(data: object, path: string): string[] {
  const values: any = get({ data, path }) ?? [];
  if (Array.isArray(values)) {
    return values.map((x) => String(x));
  }
  return [];
}

export function getBoolean(data: object, path: string): boolean {
  const value: any = get({ data, path });
  if (Array.isArray(value) && value.length === 1) {
    return value[0] === true || value[0] === "true";
  }
  return value === true || value === "true";
}

export function applyRedactions(
  data: { data: object },
  redactions: string[] | undefined = []
): { data: object } {
  redactions.forEach((key) => {
    get({ data: data.data, path: key, nullifyValue: true });
  });
  return data;
}

// recursively find key by name (i.e. data["a.b.c"], data["a.b"], data["a"])
function get({
  data,
  path,
  nullifyValue = false,
  index = -1,
}: {
  data: object;
  path: string;
  nullifyValue?: boolean;
  index?: number;
}) {
  const parts = path.split(".");
  if (index === -1) {
    index = parts.length;
  }
  const key = parts.slice(0, index).join(".");
  if (data[key] === undefined && data[key] !== null && index > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return get({ data, path, nullifyValue, index: index - 1 });
  }
  if (
    data[key] !== undefined &&
    data[key] !== null &&
    parts.slice(index).length > 0
  ) {
    const newPath = parts.slice(index).join(".");
    // eslint-disable-next-line
    return get({ data: data[key], path: newPath, nullifyValue });
  }
  if (nullifyValue) {
    data[key] = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data[key];
}
