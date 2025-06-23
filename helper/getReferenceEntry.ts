// hooks/useContentstackEntry.ts
import { useEffect, useState } from "react";
import { getEntryByUid } from "../contentstack-sdk";

export function useReferenceEntry(contentTypeUid?: string, entryUid?: string) {
  const [entry, setEntry] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!contentTypeUid || !entryUid) return;

      setLoading(true);
      try {
        const data = await getEntryByUid(contentTypeUid, entryUid);
        setEntry(data);
      } catch (err) {
        console.error("Failed to fetch entry:", err);
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [contentTypeUid, entryUid]);

  return { entry, loading, error };
}
