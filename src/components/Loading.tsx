import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-1/2">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500 custom-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-white bg-white"></div>
      </div>
    </div>
  );
}
export default React.memo(Loading);
