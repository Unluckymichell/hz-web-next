"use client";
import React, { useContext, useEffect, useRef } from "react";
import Divider from "../../Components/Divider";
import { IntersectionObserverContext } from "../Navigation";

interface ContentSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
}

function ContentSection({
  id,
  title,
  subtitle,
  children,
}: React.PropsWithChildren<ContentSectionProps>) {
  const observer = useContext(IntersectionObserverContext);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && observer) {
      const heading = sectionRef.current;
      observer.observe(heading);
      return () => observer.unobserve(heading);
    }
  }, [observer]);

  return (
    <section className="flex flex-col items-stretch text-center">
      {title ? (
        <div
          id={id}
          className="scroll-mt-10 flex flex-col items-center bg-[var(--highlight2)]"
        >
          <h2 className="mt-3 text-4xl text-gray-900 dark:text-gray-600 font-[lobster]">{title}</h2>
          <Divider className="mt-4 mb-2 bg-gray-700 dark:bg-gray-600" />
          {subtitle && <h3 className="mb-3 text-lg font-bold text-gray-700 dark:text-gray-600">{subtitle}</h3>}
        </div>
      ) : (
        <div id={id} className="scroll-mt-12 w-full h-0"></div>
      )}
      <div id={id + "*contentstart"} ref={sectionRef} className="scroll-mt-10 w-full h-0"></div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export default ContentSection;
