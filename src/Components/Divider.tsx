import classNames from "classnames";
import React from "react";

function Divider(
  props: React.PropsWithoutRef<{ dark?: boolean; className?: string }>
) {
  return (
    <div
      className={classNames(
        "w-[40%] h-[1px] mx-4",
        props.className,
        props.className?.match(/ bg-.+/)
          ? ""
          : {
              "bg-white": !props.dark,
              "bg-gray-900": props.dark,
            }
      )}
    />
  );
}

export default Divider;
