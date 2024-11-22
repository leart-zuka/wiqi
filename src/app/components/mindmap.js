'use client'

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMap } from 'react-leaflet';

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const MapEventHandler = () => {
  const map = useMap();

  useEffect(() => {
      // Add any map event listeners here if needed
      
      return () => {
          // Cleanup function
          map.off(); // Remove all event listeners
      };
  }, [map]);

  return null;
};

// Create a custom overlay component
const Scene3DOverlay = () => {
    const map = useMap();
    
    return (
        <div style={{ 
            position: "absolute",
            width: "100%",
            height: "100%",
            pointerEvents: "none", // This allows clicking through to the map
        }}>
            <div style={{ 
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto" // This makes the 3D scene interactive
            }}>
                <Scene3D />
            </div>
        </div>
    );
};

const MindMap = () => {
    
 return (
        <div>
            <h1>Interactive Quantum Mind Map</h1>
            <div style={{ display: 'flex', position: 'relative' }}>
                <MapContainer
                    //key ="map"
                    center={[51.505, -0.09]}
                    zoom={13}
                    style={{ height: '500px', width: '100%' }}
                    className="map-container" 
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        opacity={0}
                    />
                    <Scene3DOverlay />
                    <MapEventHandler />
                </MapContainer>
            </div>
        </div>
    );
};

export default MindMap;
