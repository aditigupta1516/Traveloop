"use client";
// src/features/packing/PackingDashboard.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Luggage, Sparkles, Plus, Check, MoreVertical, Search, FileText, Shirt, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Item = { id: string; name: string; packed: boolean; category: string };

const INITIAL_ITEMS: Item[] = [
  { id: "1", name: "Passport & Visa", packed: true, category: "Documents" },
  { id: "2", name: "Travel Insurance", packed: false, category: "Documents" },
  { id: "3", name: "T-Shirts (x5)", packed: true, category: "Clothes" },
  { id: "4", name: "Jeans (x2)", packed: false, category: "Clothes" },
  { id: "5", name: "Winter Jacket", packed: false, category: "Clothes" },
  { id: "6", name: "Laptop & Charger", packed: true, category: "Electronics" },
  { id: "7", name: "Universal Adapter", packed: false, category: "Electronics" },
];

export function PackingDashboard() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [newItemName, setNewItemName] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Documents", "Clothes", "Electronics"];

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setItems([...items, { id: Date.now().toString(), name: newItemName, packed: false, category: activeCategory === "All" ? "Clothes" : activeCategory }]);
    setNewItemName("");
  };

  const totalItems = items.length;
  const packedItems = items.filter(i => i.packed).length;
  const progress = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  const filteredItems = activeCategory === "All" ? items : items.filter(i => i.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    if (cat === "Documents") return <FileText size={16} />;
    if (cat === "Clothes") return <Shirt size={16} />;
    if (cat === "Electronics") return <Smartphone size={16} />;
    return <Luggage size={16} />;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-surface-50 font-display mb-3">Packing Checklist</h1>
          <p className="text-surface-400">Never forget an essential item for your trips again.</p>
        </div>
        <Button variant="gradient" icon={<Sparkles size={16} />}>AI Generate List</Button>
      </div>

      {/* Progress Card */}
      <Card variant="premium" className="p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 p-4 pointer-events-none">
          <Luggage size={120} />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="text-lg font-bold text-surface-50">Trip to Japan</h3>
                <p className="text-sm text-surface-400">12 days remaining to pack</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-brand-400">{packedItems}</span>
                <span className="text-surface-500"> / {totalItems} items packed</span>
              </div>
            </div>
            <div className="h-2.5 w-full bg-surface-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }} 
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full gradient-brand"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Checklist UI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeCategory === cat 
                  ? "bg-brand-500/10 text-brand-400 border border-brand-500/20" 
                  : "bg-surface-900 border border-white/[0.04] text-surface-300 hover:bg-surface-800"
              }`}
            >
              <div className="flex items-center gap-3">
                {cat !== "All" ? getCategoryIcon(cat) : <Luggage size={16} />}
                <span className="font-medium">{cat}</span>
              </div>
              <span className="text-xs py-0.5 px-2 rounded-full bg-surface-950/50">
                {cat === "All" ? items.length : items.filter(i => i.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Checklist Content */}
        <div className="md:col-span-3 space-y-4">
          <form onSubmit={addItem} className="flex gap-3">
            <div className="flex-1">
              <Input 
                placeholder={`Add item to ${activeCategory}...`} 
                value={newItemName} 
                onChange={(e) => setNewItemName(e.target.value)} 
                leftIcon={<Plus size={16} />}
              />
            </div>
            <Button type="submit" variant="secondary">Add</Button>
          </form>

          <Card className="p-2 border border-white/[0.04]">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-center justify-between p-3 rounded-xl group transition-colors ${
                    item.packed ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                        item.packed ? "bg-emerald-500 text-white" : "bg-surface-800 border border-surface-600 hover:border-brand-400"
                      }`}
                    >
                      {item.packed && <Check size={14} />}
                    </button>
                    <span className={`font-medium transition-colors ${item.packed ? "text-surface-500 line-through" : "text-surface-100"}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-surface-500">{item.category}</span>
                    <button className="text-surface-500 hover:text-surface-300"><MoreVertical size={16} /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-surface-500">
                <Luggage size={48} className="mx-auto mb-4 opacity-20" />
                <p>No items in this category yet.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
