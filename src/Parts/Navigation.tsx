"use client";
import { EffectEventManager } from "@/Utils/EffectEventManager";
import classNames from "classnames";
import Link from "next/link";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface NavigationProps extends React.PropsWithChildren {
  links: {
    link: string;
    id?: string;
    label: string;
  }[];
}

export const IntersectionObserverContext =
  createContext<IntersectionObserver | null>(null);

export const SectionsInViewContext = createContext<string[]>([]);

function Navigation({ links, children }: NavigationProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [sectionInView, setSectionsInView] = useState<string[]>([]);

  const inViewNavRef = useRef<HTMLAnchorElement>(null);
  const scrollToPagePos = () => {
    console.log("scrollend", inViewNavRef.current);
    inViewNavRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const observerhandler = useRef<IntersectionObserverCallback>(null);
  const makeObserver = () =>
    new IntersectionObserver(
      (evl, o) => observerhandler.current && observerhandler.current(evl, o),
      {
        rootMargin: "0px",
      }
    );

  const [observer, setObserver] = useState(
    typeof window !== "undefined" ? makeObserver() : null
  );

  useEffect(() => {
    if (!observer) return void setObserver(makeObserver());
    const obs = observer;
    return () => obs.disconnect();
  }, [observer]);

  observerhandler.current = (evl) =>
    evl.forEach((e) => {
      console.log(
        e.target.id,
        e.isIntersecting ? "is now on screen" : "not on screen"
      );
      if (e.isIntersecting)
        setSectionsInView((l) =>
          l.concat(e.target.id.replace("*contentstart", ""))
        );
      else
        setSectionsInView((l) =>
          l.filter((id) => id != e.target.id.replace("*contentstart", ""))
        );
    });

  const resizeCallback = useCallback(() => {
    if (
      ulRef.current &&
      ulRef.current.scrollWidth > ulRef.current.clientWidth
    ) {
      if (!showButtons) setShowButtons(true);
    } else {
      if (showButtons) setShowButtons(false);
    }
  }, [showButtons]);

  const scrollNavlinks = (dir: -1 | 1) => {
    ulRef.current?.scrollBy({
      behavior: "smooth",
      left: dir * 100,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resizeCallback(), []);
  useEffect(() => {
    return EffectEventManager()
      .handle("scrollend", scrollToPagePos)
      .other(window)
      .handle("resize", resizeCallback);
  }, [resizeCallback]);

  let isFirst = true;
  return (
    <IntersectionObserverContext.Provider value={observer}>
      <SectionsInViewContext.Provider value={sectionInView}>
        <nav
          className={classNames(
            "w-full h-18 sm:h-12 sticky top-0 z-1",
            "flex flex-col justify-between items-stretch",
            "sm:flex-row sm:items-stretch",
            "bg-[var(--highlight)] shadow-[0px_5px_5px_rgba(0,_0,_0,_0.2)]"
          )}
        >
          <Link
            className="w-max px-4 mx-auto sm:mx-0 flex items-center"
            href={"/"}
          >
            <span className="text-border-1 hover:scale-110 transition-[scale] text-lg sm:text-xl text-blue-100 w-max font-extrabold select-none font-(family-name:--font-lobster)">
              Corinna & Michael
            </span>
          </Link>
          <div className="flex items-stretch grow-1 min-w-0 overflow-clip">
            <button
              className={classNames(
                "text-gray-700 shadow-[4px_0_5px_rgba(0,_0,_0,_0.4)]",
                {
                  hidden: !showButtons,
                }
              )}
              onClick={() => scrollNavlinks(-1)}
            >
              <FaCaretLeft className="text-2xl my-auto mx-2" />
            </button>
            <ul
              ref={ulRef}
              className="min-w-0 flex-1 flex items-stretch overflow-x-scroll overflow-y-clip no-scrollbar"
            >
              {links.map((nav) => (
                <li
                  key={nav.link}
                  className={classNames(
                    "flex items-center px-4 text-nowrap transition-all box-border",
                    nav.id && sectionInView.includes(nav.id)
                      ? isFirst
                        ? "border-b-4 border-gray-700"
                        : "border-b-4 border-gray-500/50"
                      : "border-b-0 border-gray-500/50",
                    "hover:border-b-8 hover:underline focus-within:border-b-8"
                  )}
                >
                  <Link
                    href={nav.link}
                    className="text-gray-700 font-extrabold select-none hover:scale-110"
                    ref={
                      nav.id &&
                      sectionInView.includes(nav.id) &&
                      isFirst &&
                      !(isFirst = false)
                        ? inViewNavRef
                        : undefined
                    }
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className={classNames(
                "text-gray-700 shadow-[-4px_0_5px_rgba(0,_0,_0,_0.4)]",
                {
                  hidden: !showButtons,
                }
              )}
              onClick={() => scrollNavlinks(1)}
            >
              <FaCaretRight className="text-2xl my-auto mx-2" />
            </button>
          </div>
        </nav>
        {children}
      </SectionsInViewContext.Provider>
    </IntersectionObserverContext.Provider>
  );
}

export default Navigation;
