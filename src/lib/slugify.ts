import { db } from "@/server/db";

const cyrillicToLatin: Record<string, string> = {
  // Kazakh Cyrillic to Latin
  а: "a",
  ә: "a",
  б: "b",
  в: "v",
  г: "g",
  ғ: "gh",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  қ: "q",
  л: "l",
  м: "m",
  н: "n",
  ң: "ng",
  о: "o",
  ө: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ұ: "u",
  ү: "u",
  ф: "f",
  х: "h",
  һ: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  і: "i",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  // Uppercase variants
  А: "A",
  Ә: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Ғ: "Gh",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Қ: "Q",
  Л: "L",
  М: "M",
  Н: "N",
  Ң: "Ng",
  О: "O",
  Ө: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ұ: "U",
  Ү: "U",
  Ф: "F",
  Х: "H",
  Һ: "H",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Shch",
  Ъ: "",
  Ы: "Y",
  І: "I",
  Ь: "",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

/**
 * Converts text to a URL-friendly slug by transliterating Cyrillic to Latin
 * @param text - The text to slugify
 * @returns A URL-safe slug
 * @example
 * slugify("Қазақстан туралы") // "qazaqstan-turaly"
 * slugify("Жаңалықтар 2024") // "zhanalyqtar-2024"
 */
export function slugify(text: string): string {
  return (
    text
      .trim()
      // Transliterate Cyrillic to Latin
      .split("")
      .map((char) => cyrillicToLatin[char] || char)
      .join("")
      // Convert to lowercase
      .toLowerCase()
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, "-")
      // Remove special characters (keep only alphanumeric and hyphens)
      .replace(/[^\w-]/g, "")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
      // Collapse multiple hyphens into one
      .replace(/-+/g, "-")
  );
}

/**
 * Generates a unique slug for an article by appending a counter if needed
 * @param prisma - Prisma client instance
 * @param title - Article title to generate slug from
 * @param excludeId - Optional article ID to exclude (for updates)
 * @returns A unique slug
 */
export async function generateUniqueSlug(
  title: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  // Keep trying until we find a unique slug
  while (true) {
    const existing = await db.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    // If no conflict, or it's the same article being updated, we're good
    if (!existing || existing.id === excludeId) {
      return slug;
    }

    // Add counter and try again
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Optional: Allow manual slug override with validation
 * @param slug - The proposed slug
 * @returns Validated and formatted slug
 */
export function validateSlug(slug: string): string {
  const cleaned = slug
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

  if (!cleaned) {
    throw new Error(
      "Invalid slug: must contain at least one alphanumeric character",
    );
  }

  return cleaned;
}
