import { useState, useEffect } from "react";
import { folderApi, PictureResponse } from "../../../utils/api/folder-api";

export function useSubcategoryPictures(categoryId: string) {
  const [pictures, setPictures] = useState<PictureResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPictures = async () => {
    try {
      setLoading(true);
      setError(null);
      const picturesData = await folderApi.getPicturesByCategory(categoryId);
      setPictures(picturesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pictures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchPictures();
    }
  }, [categoryId]);

  return { pictures, loading, error, refetch: fetchPictures };
}
