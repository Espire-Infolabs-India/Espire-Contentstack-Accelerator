// components/Search.tsx
import { algoliasearch } from "algoliasearch";

import { locale } from "moment";
import { useRouter } from 'next/router';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Pagination,
  RefinementList 
} from 'react-instantsearch';

 
const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string);
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

const Hit = ({ hit }: any) => {
  const { locale, defaultLocale } = useRouter();
  const localizedUrl =
    locale === defaultLocale ? hit.url : `/${locale}${hit.url}`;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition flex gap-4">
      {hit.image && (
        <img
          src={hit.image}
          alt={hit.title}
          className="w-32 h-20 object-cover rounded-md flex-shrink-0"
        />
      )}

      <div className="p-5 flex flex-col flex-grow">
        <a
          href={localizedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-600 hover:underline"
        >
          <Highlight attribute="title" hit={hit} />
        </a>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          <Highlight attribute="introduction" hit={hit} />
        </p>
      </div>
    </div>
  );
};

export default function Search() {
    const { locale } = useRouter();

    console.log("Current locale:", locale);
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <div className="mb-4">
            <Configure query="" filters={`language:"${locale}"`} hitsPerPage={5} />
            <aside className="space-y-6 p-4 border-r w-64">
        <div>
        <h4 className="font-semibold text-gray-700 mb-2">Tags</h4>
        <RefinementList attribute="topic"  />
      </div>
       </aside>
       <SearchBox
            classNames={{
              root: 'w-full',
              form: 'flex',
              input: 'w-full border p-2 rounded-md shadow-sm',
              submit: 'hidden',
              reset: 'hidden',
            }}
            placeholder="Search articles..."
          />
          <div className="grid gap-4">
          <Hits hitComponent={Hit} />
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            classNames={{
              root: 'flex gap-2',
              item: 'border px-3 py-1 rounded text-sm hover:bg-blue-100',
              selectedItem: 'bg-blue-600 text-white',
              disabledItem: 'opacity-50 cursor-not-allowed',
            }}
          />
        </div>
        </div>
        </InstantSearch>
    </div>
  );
}
