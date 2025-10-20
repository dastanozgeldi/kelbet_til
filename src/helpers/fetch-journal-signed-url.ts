export async function fetchJournalSignedUrl(filename: string) {
  const response = await fetch("/api/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: `journals/${filename}` }),
  });

  if (!response.ok) {
    throw new Error("Failed to get download URL");
  }

  const { signedUrl } = await response.json();
  return signedUrl;
}
