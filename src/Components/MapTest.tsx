import React, { useEffect, useRef, useState } from "react";

const data = [
  { name: "derry", x: 30, y: 20 },
  { name: "test2", x: 30, y: 40 },
  { name: "test3", x: 50, y: 60 },
];

export default function MapTest() {
  const mapRef = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resizeHandler = () => {
    if (mapRef.current) {
      const dimensions = mapRef.current.getBoundingClientRect();
      setWidth(dimensions.width);
      setHeight(dimensions.height);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [mapRef]);

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>
      <img src="/images/map.svg" alt="map" ref={mapRef} />
      {data.map((location) => (
        <Marker
          position={{ x: (width / location.x) * 10, y: (height / location.y) * 10 }}
          color="green"
          text={location.name}
        />
      ))}
    </div>
  );
}

function Marker({
  position,
  color,
  text,
}: {
  position: { x: number; y: number };
  color: string;
  text: string;
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
    </div>
  );
}
