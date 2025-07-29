// components/SearchHit.tsx
'use client';

import { useRouter } from 'next/router';
import { Highlight } from 'react-instantsearch';

export const SearchHit = ({ hit }: any) => {

  const { locale, defaultLocale } = useRouter();
  const localizedUrl = locale === defaultLocale ? hit.url : `/${locale}${hit.url}`;

  const formattedDate = hit.created_at
    ? new Date(hit.created_at).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="grid gap-4">
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex gap-4 bg-white">
     {(hit.image ) && (
  <img
    src={hit.image}
    alt={hit.title}
    className="w-32 h-20 object-cover rounded-md flex-shrink-0"
  />
)}

      <div className="flex flex-col justify-between flex-grow">
        <a
          href={localizedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-600 hover:underline"
        >
          <Highlight attribute="title" hit={hit} />
        </a>

        {formattedDate && (
          <span className="text-xs text-gray-500 mt-1">{formattedDate}</span>
        )}

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          <Highlight attribute="description" hit={hit} />
        </p>

        {hit.topic && (
          <div className="mt-3 flex flex-wrap gap-2">
            {(Array.isArray(hit.topic) ? hit.topic : [hit.topic]).map(
              (tag: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};
