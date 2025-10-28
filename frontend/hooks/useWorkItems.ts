"use client"; // because it uses React hooks

import { useState, useEffect } from "react";

export interface WorkItem {
  id: number;
  title: string;
  description: string;
  createdBy?: string;
  createdAt: string;
}



export function useWorkItems() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch items from backend
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch items");
      const data: WorkItem[] = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Add new work item
  const addItem = async (title: string, description: string) => {
    if (!title || !description) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const newItem: WorkItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
      return newItem;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [apiUrl]);

  return { items, loading, error, addItem, fetchItems };
}
