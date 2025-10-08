import { useState, useEffect, useCallback } from "react";
import { folderApi, FolderResponse } from "../../../utils/api/folder-api";

export function useFolderDetail(folderId: string) {
  const [folder, setFolder] = useState<FolderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolder = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const folderData = await folderApi.getFolderById(folderId);
      setFolder(folderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch folder");
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    if (folderId) {
      fetchFolder();
    }
  }, [folderId, fetchFolder]);

  return { folder, loading, error, refreshFolder: fetchFolder };
}
