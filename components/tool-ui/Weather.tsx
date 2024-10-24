import React from "react";

export function Weather({ weatherAtLocation }: { weatherAtLocation: any}) {
  console.log(weatherAtLocation);
  // const { value, unit } = weatherAtLocation;
  return (
    <div className="bg-red-400">
      {/* {value}°{unit} */}
    </div>
  );
}
