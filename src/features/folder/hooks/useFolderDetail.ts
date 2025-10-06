import { useState, useEffect } from "react";
import { folderApi, FolderResponse } from "../../../utils/api/folder-api";

export function useFolderDetail(folderId: string) {
  const [folder, setFolder] = useState<FolderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolder = async () => {
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
    };

    if (folderId) {
      fetchFolder();
    }
  }, [folderId]);

  return { folder, loading, error };
}
