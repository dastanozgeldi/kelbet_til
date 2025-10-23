/**
 * PDF Cache using IndexedDB
 * Caches PDF files to reduce re-downloads on page refreshes
 */

const DB_NAME = "pdf-cache-db";
const STORE_NAME = "pdf-files";
const DB_VERSION = 1;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedPDF {
  key: string;
  blob: Blob;
  timestamp: number;
  fileUrl: string;
}

class PDFCache {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "key" });
        }
      };
    });

    return this.dbPromise;
  }

  async get(fileUrl: string): Promise<string | null> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(fileUrl);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const cachedPDF: CachedPDF | undefined = request.result;

          if (!cachedPDF) {
            resolve(null);
            return;
          }

          // Check if cache has expired
          const now = Date.now();
          if (now - cachedPDF.timestamp > CACHE_DURATION) {
            // Cache expired, delete it
            this.delete(fileUrl);
            resolve(null);
            return;
          }

          // Return blob URL
          const blobUrl = URL.createObjectURL(cachedPDF.blob);
          resolve(blobUrl);
        };

        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error getting PDF from cache:", error);
      return null;
    }
  }

  async getBlob(fileUrl: string): Promise<Blob | null> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(fileUrl);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const cachedPDF: CachedPDF | undefined = request.result;

          if (!cachedPDF) {
            resolve(null);
            return;
          }

          // Check if cache has expired
          const now = Date.now();
          if (now - cachedPDF.timestamp > CACHE_DURATION) {
            // Cache expired, delete it
            this.delete(fileUrl);
            resolve(null);
            return;
          }

          // Return blob directly
          resolve(cachedPDF.blob);
        };

        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error getting PDF blob from cache:", error);
      return null;
    }
  }

  async set(fileUrl: string, blob: Blob): Promise<void> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const cachedPDF: CachedPDF = {
        key: fileUrl,
        blob,
        timestamp: Date.now(),
        fileUrl,
      };

      const request = store.put(cachedPDF);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error setting PDF in cache:", error);
    }
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(fileUrl);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error deleting PDF from cache:", error);
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error clearing PDF cache:", error);
    }
  }

  async getCacheSize(): Promise<number> {
    try {
      const db = await this.getDB();
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const items: CachedPDF[] = request.result;
          const totalSize = items.reduce(
            (sum, item) => sum + item.blob.size,
            0,
          );
          resolve(totalSize);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error getting cache size:", error);
      return 0;
    }
  }
}

export const pdfCache = new PDFCache();

