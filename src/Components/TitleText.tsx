import classNames from "classnames";
import React from "react";

function TitleText(props: React.PropsWithChildren<{ className: string }>) {
  return (
    <h2
      style={{
        textShadow: "4px 4px 5px black",
      }}
      className={classNames(props.className, "text-white")}
    >
      {props.children}
    </h2>
  );
}

export default TitleText;
