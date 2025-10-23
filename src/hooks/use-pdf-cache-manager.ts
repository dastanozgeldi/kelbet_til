/**
 * Hook for managing PDF cache
 * Useful for admin panels or user settings to view and clear cache
 */

import { useState, useCallback, useEffect } from "react";
import { pdfCache } from "@/lib/pdf-cache";

export function usePDFCacheManager() {
  const [cacheSize, setCacheSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const refreshCacheSize = useCallback(async () => {
    setLoading(true);
    try {
      const size = await pdfCache.getCacheSize();
      setCacheSize(size);
    } catch (error) {
      console.error("Error getting cache size:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCache = useCallback(async () => {
    setLoading(true);
    try {
      await pdfCache.clear();
      setCacheSize(0);
      return true;
    } catch (error) {
      console.error("Error clearing cache:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const formatSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  useEffect(() => {
    refreshCacheSize();
  }, [refreshCacheSize]);

  return {
    cacheSize,
    cacheSizeFormatted: formatSize(cacheSize),
    loading,
    refreshCacheSize,
    clearCache,
  };
}

