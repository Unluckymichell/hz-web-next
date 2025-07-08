import React, { PropsWithChildren } from "react";

export const ImageStackContainer = ({ children }: PropsWithChildren) => (
  <div className="shadow-black shadow-md border-1 rotate-2 border-green-100 bg-green-100">
    <div className="shadow-black shadow-md border-1 -rotate-5 border-blue-100 bg-blue-100">
      <div className="flex justify-center items-center shadow-black shadow-md w-60 aspect-4/3 border-1 rotate-3 border-green-100 bg-green-100">
        <div className="h-[90%] w-[90%] overflow-clip relative">{children}</div>
      </div>
    </div>
  </div>
);
