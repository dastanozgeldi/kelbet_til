export async function fetchBookSignedUrl(filename: string) {
  const response = await fetch("/api/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: `books/${filename}` }),
  });

  if (!response.ok) {
    throw new Error("Failed to get download URL");
  }

  const { signedUrl } = await response.json();
  return signedUrl;
}
