"use client";
// src/features/itinerary/Timeline.tsx
import { useState } from "react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Clock, MapPin, MoreHorizontal, Train, Coffee, Camera, Utensils, Bed } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

// Mock Data
const INITIAL_DAYS = [
  {
    id: "day-1",
    date: "Oct 12",
    title: "Arrival in Tokyo",
    items: [
      { id: "item-1", time: "14:00", title: "Check-in at Shinjuku Hotel", type: "accommodation", location: "Shinjuku City", cost: 0, icon: Bed },
      { id: "item-2", time: "16:30", title: "Explore Omoide Yokocho", type: "sightseeing", location: "Shinjuku City", cost: 0, icon: Camera },
      { id: "item-3", time: "19:00", title: "Dinner at Izakaya", type: "food", location: "Shinjuku", cost: 45, icon: Utensils },
    ]
  },
  {
    id: "day-2",
    date: "Oct 13",
    title: "Tradition & Modernity",
    items: [
      { id: "item-4", time: "09:00", title: "Senso-ji Temple", type: "sightseeing", location: "Asakusa", cost: 0, icon: Camera },
      { id: "item-5", time: "12:00", title: "Sushi Lunch", type: "food", location: "Tsukiji", cost: 30, icon: Utensils },
      { id: "item-6", time: "14:30", title: "TeamLab Planets", type: "activity", location: "Toyosu", cost: 35, icon: Star },
    ]
  }
];

function Star({ className }: { className?: string }) {
  return <Camera className={className} />; // Fallback icon
}

function SortableItem({ id, item }: { id: string, item: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-start gap-4 p-3 rounded-xl border transition-colors",
        isDragging ? "bg-surface-800 border-brand-500/50 shadow-2xl z-50 opacity-90" : "bg-surface-900 border-white/[0.04] hover:bg-surface-800/80"
      )}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="mt-1 cursor-grab active:cursor-grabbing text-surface-600 hover:text-surface-300 transition-colors p-1"
      >
        <GripVertical size={16} />
      </div>
      
      <div className="w-12 text-center flex-shrink-0 mt-1">
        <span className="text-sm font-semibold text-surface-300">{item.time}</span>
      </div>

      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        item.type === 'food' ? 'bg-amber-500/10 text-amber-400' :
        item.type === 'sightseeing' ? 'bg-brand-500/10 text-brand-400' :
        item.type === 'accommodation' ? 'bg-purple-500/10 text-purple-400' :
        'bg-emerald-500/10 text-emerald-400'
      }`}>
        <item.icon size={14} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-surface-100 truncate">{item.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-surface-500">
            <MapPin size={11} /> {item.location}
          </span>
          {item.cost > 0 && (
            <span className="text-xs text-emerald-400 font-medium">
              {formatCurrency(item.cost)}
            </span>
          )}
        </div>
      </div>

      <button className="p-2 text-surface-600 hover:text-surface-300 transition-colors rounded-lg hover:bg-white/5">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

export function Timeline() {
  const [days, setDays] = useState(INITIAL_DAYS);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Simplified intra-day reordering for demo
    // In production, we'd handle cross-day dragging
    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      setDays((prev) => {
        return prev.map(day => {
          const oldIndex = day.items.findIndex(i => i.id === activeId);
          const newIndex = day.items.findIndex(i => i.id === overId);
          if (oldIndex !== -1 && newIndex !== -1) {
            const newItems = arrayMove(day.items, oldIndex, newIndex);
            return { ...day, items: newItems };
          }
          return day;
        });
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-8">
        {days.map((day) => (
          <div key={day.id} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[38px] top-10 bottom-0 w-px bg-surface-800" />
            
            <div className="flex items-center gap-4 mb-4 sticky top-0 z-10 bg-surface-950/80 backdrop-blur-md py-2">
              <div className="w-[80px] text-right">
                <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">{day.date}</span>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <h3 className="text-lg font-bold text-surface-50">{day.title}</h3>
                <span className="text-xs text-surface-500 bg-surface-800 px-2 py-0.5 rounded-full">
                  {day.items.length} items
                </span>
              </div>
            </div>

            <div className="pl-[80px]">
              <SortableContext items={day.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {day.items.map((item) => (
                    <SortableItem key={item.id} id={item.id} item={item} />
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
