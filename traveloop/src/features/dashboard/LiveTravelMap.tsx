"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, Globe, ExternalLink, Search } from "lucide-react";
import { motion } from "framer-motion";

// Fix Leaflet icon issue
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const DESTINATIONS = [
  { name: "Tokyo", country: "Japan", pos: [35.6762, 139.6503] as [number, number], search: "Tokyo+Japan" },
  { name: "Paris", country: "France", pos: [48.8566, 2.3522] as [number, number], search: "Paris+France" },
  { name: "New York", country: "USA", pos: [40.7128, -74.0060] as [number, number], search: "New+York+City" },
  { name: "London", country: "UK", pos: [51.5074, -0.1278] as [number, number], search: "London+UK" },
];

export default function LiveTravelMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [center, setCenter] = useState<[number, number]>([20, 0]);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[500px] w-full bg-surface-900/50 animate-pulse rounded-[2.5rem]" />;

  const handleDestinationClick = (dest: typeof DESTINATIONS[0]) => {
    setCenter(dest.pos);
    setZoom(12);
  };

  return (
    <Card className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border-white/5 bg-surface-950 shadow-2xl z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {DESTINATIONS.map((dest) => (
          <Marker key={dest.name} position={dest.pos} icon={icon}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[150px]">
                <h4 className="font-bold text-surface-900 text-base mb-1">{dest.name}</h4>
                <p className="text-xs text-surface-600 mb-3">{dest.country}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${dest.search}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-brand-500 text-white text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-brand-600 transition-colors w-full justify-center"
                >
                  <ExternalLink size={12} /> View Routes & Map
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController center={center} zoom={zoom} />
        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 pointer-events-auto shadow-2xl">
            <h3 className="text-xs font-black text-brand-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
               <Globe size={14} /> Global Travel Network
            </h3>
            <p className="text-sm text-white font-medium">
              Interactive Route Explorer
            </p>
          </div>
          
          <div className="flex flex-col gap-2 pointer-events-auto">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-black/60 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 rounded-xl px-4"
              onClick={() => { setCenter([20, 0]); setZoom(2); }}
            >
              <Globe size={16} className="mr-2" /> Reset View
            </Button>
          </div>
        </div>

        {/* Destination Quick-Select */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                onClick={() => handleDestinationClick(dest)}
                className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-white text-xs font-bold hover:bg-brand-500/20 hover:border-brand-500/50 transition-all whitespace-nowrap"
              >
                {dest.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="bg-black/60 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
                <p className="text-[10px] font-black text-surface-500 uppercase tracking-widest mb-1">Total Coverage</p>
                <p className="text-2xl font-black text-white font-display tracking-tight">World Wide</p>
              </div>
              <div className="bg-black/60 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
                <p className="text-[10px] font-black text-surface-500 uppercase tracking-widest mb-1">Active Routes</p>
                <p className="text-2xl font-black text-brand-400 font-display tracking-tight">Live</p>
              </div>
            </div>
            
            <div className="bg-emerald-500/20 backdrop-blur-xl px-5 py-3 rounded-2xl border border-emerald-500/30">
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">System Status</p>
               <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                 Encrypted Connection
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] z-0" />
      
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: white !important;
          border-radius: 16px !important;
          padding: 0 !important;
        }
        .custom-popup .leaflet-popup-tip {
          background: white !important;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0 !important;
        }
      `}</style>
    </Card>
  );
}
