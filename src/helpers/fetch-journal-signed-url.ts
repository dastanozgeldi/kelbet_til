import { pdfCache } from "@/lib/pdf-cache";

export async function fetchJournalSignedUrl(
  filename: string,
): Promise<string | Blob> {
  const cacheKey = `journals/${filename}`;

  // Try to get from cache first
  const cachedBlob = await pdfCache.getBlob(cacheKey);
  if (cachedBlob) {
    console.log(`[PDF Cache] Hit: ${filename}`);
    return cachedBlob;
  }

  console.log(`[PDF Cache] Miss: ${filename} - Downloading...`);

  // Cache miss - fetch the signed URL
  const response = await fetch("/api/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: cacheKey }),
  });

  if (!response.ok) {
    throw new Error("Failed to get download URL");
  }

  const { signedUrl } = await response.json();

  // Download the PDF blob and cache it
  try {
    const pdfResponse = await fetch(signedUrl);
    if (!pdfResponse.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await pdfResponse.blob();
    await pdfCache.set(cacheKey, blob);

    // Return the blob directly for react-pdf to handle
    return blob;
  } catch (error) {
    console.error("Error caching PDF:", error);
    // If caching fails, return the signed URL directly
    return signedUrl;
  }
}
