import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Überprüft, ob der Slug sicher ist.
 * Verhindert Path Traversal durch Ausschluss von '../' und absoluten Pfaden.
 * Erlaubt alle anderen Zeichen.
 * @param slug Der decodierte Slug.
 * @returns true, wenn der Slug gültig ist; sonst false.
 */
function isValidSlug(slug: string): boolean {
  // Ausschluss von Path Traversal Mustern
  if (slug.includes("..") || path.isAbsolute(slug)) {
    return false;
  }
  return true;
}

/**
 * Liest den Inhalt eines Beitrags basierend auf dem Ordner und Slug.
 * Erlaubt alle Zeichen im Slug, führt jedoch Sicherheitsüberprüfungen durch.
 * @param folder Der Ordner, in dem sich der Beitrag befindet.
 * @param slug Der Slug des Beitrags (URL-codiert).
 * @returns Das Matter-Objekt mit Inhalt und Metadaten.
 */
export function getPostContent(folder: string, slug: string) {
  try {
    console.log("Originaler Slug:", slug);

    // Decodieren des Slugs
    const decodedSlug = decodeURIComponent(slug);
    console.log("Decodierter Slug:", decodedSlug);

    // Validierung des Slugs
    if (!isValidSlug(decodedSlug)) {
      throw new Error("Ungültige Zeichen im Slug.");
    }

    // Optional: Entfernen von führenden/trailing Leerzeichen
    const sanitizedSlug = decodedSlug.trim();

    // Erstellen des vollständigen Dateipfads
    const file = path.join(
      process.cwd(),
      "public",
      "posts",
      folder,
      `${sanitizedSlug}.mdx`,
    );
    console.log("Versuchter Dateipfad:", file);

    // Path Normalization und Sicherheit
    const normalizedPath = path.normalize(file);
    const postsPath = path.join(process.cwd(), "public", "posts", folder);
    if (!normalizedPath.startsWith(postsPath)) {
      throw new Error("Ungültiger Dateipfad.");
    }

    // Überprüfen, ob die Datei existiert
    if (!fs.existsSync(file)) {
      throw new Error(
        `Die Datei ${sanitizedSlug}.mdx existiert nicht im Ordner ${folder}.`,
      );
    }

    // Lesen des Dateiinhalts
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    console.log("Beitragsinhalt erfolgreich gelesen.");
    return matterResult;
  } catch (error) {
    console.error("Fehler beim Lesen des Beitragsinhalts:", error);
    throw error;
  }
}
