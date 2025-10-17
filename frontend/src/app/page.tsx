"use client";

import Image from "next/image";
import { useState } from "react";
import { useWorkItems } from "../../hooks/useWorkItems";

export default function Home() {
  const { items, loading, error, addItem } = useWorkItems();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 font-sans p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Work Item Tracker
        </h1>

        {/* Form */}
        <form onSubmit={handleAdd} className="flex flex-col space-y-4 mb-8">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="self-center px-6 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Add Item
          </button>
        </form>

        {/* List Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Existing Work Items
        </h2>

        {/* List of Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-green-700">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-gray-400 text-sm mt-2">Created by: User</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
