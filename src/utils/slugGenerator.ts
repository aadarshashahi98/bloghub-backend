// 🔹 Basic slug generator (sync)
export function generateSlug(text: string): string {
  return text
    .normalize('NFKD')                 // break accented chars
    .replace(/[\u0300-\u036f]/g, '')   // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')      // remove special chars
    .replace(/\s+/g, '-')              // spaces → -
    .replace(/-+/g, '-')               // multiple - → single
    .replace(/^-+|-+$/g, '');          // trim - from start/end
}


// 🔹 Unique slug generator (async)
export async function generateUniqueSlug(
  text: string,
  checkSlugExists: (slug: string) => Promise<boolean>
): Promise<string> {
  const baseSlug = generateSlug(text);
  let slug = baseSlug;
  let count = 1;

  while (await checkSlugExists(slug)) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
}