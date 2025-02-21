"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./custom-accordion.module.css";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface CustomAccordionProps {
  items: AccordionItem[];
}

export default function CustomAccordion({ items }: CustomAccordionProps) {
  // track open state for each item independently
  const [openStates, setOpenStates] = useState<boolean[]>(() =>
    items.map(() => false),
  );
  // refs to measure each content's scrollHeight
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* // bunun yaptığı tümü tıklananların hepsi açık kalıyor   
const toggleIndex = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  }; */

  const toggleIndex = (index: number) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? !open : false)),
    );
  };

  // Update max-height dynamically for smooth transitions
  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        if (openStates[index]) {
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [openStates]);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openStates[index];
        return (
          <div
            key={index}
            className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
          >
            <button
              className={styles.header}
              onClick={() => toggleIndex(index)}
            >
              <span>{item.title}</span>
              <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>
                {isOpen ? <X size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className={styles.content}
            >
              <div className={styles.contentInner}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
