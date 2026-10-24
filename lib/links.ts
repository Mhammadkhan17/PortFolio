export function hasLink(url?: string): url is string {
  return Boolean(url && url !== "#");
}
