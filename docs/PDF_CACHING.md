# PDF Caching System

## Overview

The PDF caching system uses **IndexedDB** to store downloaded PDFs in the browser, significantly reducing re-downloads and improving performance for large files (up to 50MB+).

## How It Works

1. **First Load**: When a PDF is requested for the first time:
   - A signed URL is fetched from the server
   - The PDF is downloaded from Cloudflare R2
   - The PDF blob is stored in IndexedDB with the file URL as the key
   - The blob is returned directly to react-pdf's Document component

2. **Subsequent Loads**: When the same PDF is requested again:
   - The system checks IndexedDB for a cached version
   - If found and not expired, the cached blob is returned directly (no network request!)
   - If not found or expired, the process repeats from step 1

## Technical Details

### Why Blobs Instead of Blob URLs?

The PDF viewer uses `react-pdf` which internally uses PDF.js. When using blob URLs (created via `URL.createObjectURL()`), PDF.js's worker sometimes encounters race conditions leading to errors like:

```
Error: Cannot read properties of null (reading 'sendWithPromise')
```

To avoid this, we return the `Blob` object directly instead of creating a blob URL. React-pdf's `Document` component accepts both strings (URLs) and Blobs, making this approach more reliable.

### Cache Expiration 
   - Cached PDFs expire after **24 hours**
   - Expired PDFs are automatically deleted and re-downloaded when accessed

## Files Created/Modified

### New Files

- `src/lib/pdf-cache.ts` - Core caching logic using IndexedDB
- `src/hooks/use-pdf-cache-manager.ts` - Hook for managing cache (view size, clear cache)
- `src/components/pdf-cache-manager.tsx` - UI component for cache management
- `docs/PDF_CACHING.md` - This documentation file

### Modified Files

- `src/helpers/fetch-book-signed-url.ts` - Added caching logic
- `src/helpers/fetch-journal-signed-url.ts` - Added caching logic
- `src/app/(main)/[id]/_components/pdf-book.tsx` - Added blob URL cleanup

## Performance Benefits

- **No Re-downloads**: PDFs are only downloaded once per 24 hours
- **Instant Loading**: Cached PDFs load instantly on page refresh
- **Reduced Bandwidth**: Saves significant bandwidth for large files
- **Better UX**: Faster page loads and better offline capability

## Console Logging

The caching system logs to the console for debugging:

```
[PDF Cache] Hit: example.pdf     // PDF loaded from cache
[PDF Cache] Miss: example.pdf - Downloading...  // PDF not in cache, downloading
```

## Cache Management

### Using the UI Component

Add the cache manager to your admin panel:

```tsx
import { PDFCacheManager } from "@/components/pdf-cache-manager";

export function AdminSettings() {
  return (
    <div>
      <PDFCacheManager />
    </div>
  );
}
```

### Programmatic Access

```tsx
import { pdfCache } from "@/lib/pdf-cache";

// Clear all cached PDFs
await pdfCache.clear();

// Get cache size in bytes
const size = await pdfCache.getCacheSize();

// Delete a specific PDF from cache
await pdfCache.delete("books/example.pdf");
```

## Browser Compatibility

IndexedDB is supported in all modern browsers:
- Chrome 24+
- Firefox 16+
- Safari 10+
- Edge (all versions)

## Storage Limits

- Most browsers allow **at least 50MB** of IndexedDB storage
- Chrome/Edge: Unlimited (with user permission)
- Firefox: 2GB per origin
- Safari: 1GB per origin

If storage limits are reached, the oldest cached items will be evicted automatically.

## Memory Management

The system manages memory efficiently by:

1. **Direct Blob Usage**: Passing Blob objects directly to react-pdf instead of creating blob URLs eliminates the need for manual URL revocation
2. **Automatic Cleanup**: IndexedDB handles blob lifecycle automatically
3. **Cache Size Monitoring**: The `PDFCacheManager` component shows current cache size
4. **Manual Clearing**: Users can clear the cache when needed via the UI or programmatically

## Future Enhancements

Potential improvements for the caching system:

1. **Service Worker**: Add service worker for true offline support
2. **Cache Versioning**: Track file versions to invalidate cache on updates
3. **Selective Caching**: Allow users to pin specific PDFs for offline access
4. **Cache Analytics**: Track cache hit/miss rates and performance metrics
5. **Progressive Loading**: Cache PDFs in chunks for better UX on slow connections

