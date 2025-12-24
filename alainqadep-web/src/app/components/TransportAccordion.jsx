'use client';

import { useState } from 'react';

export default function TransportAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-0 border-t border-gray-400">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-400">
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center py-6 text-left transition-all duration-200"
          >
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 pr-4">{item.title}</h3>
            <span className="text-gray-900 flex-shrink-0">
              {openIndex === index ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </button>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className="pb-8 text-gray-800 leading-relaxed text-base">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
