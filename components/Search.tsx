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
  RefinementList,
   
} from 'react-instantsearch';

import { ResultsCount  } from "./Search Componets/totalrecords"
import { Facets  } from "./Search Componets/facets"
import { SearchPagination  } from "./Search Componets/Pagination"
import { SearchBoxIcon  } from "./Search Componets/SearchBox"
import { SearchHit  } from "./Search Componets/SearchHit"


 
const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string);
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;



export default function Search() {
    const { locale } = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure query="" filters={`language:"${locale}"`} hitsPerPage={10} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Facets/>
         <div className="md:col-span-3 space-y-6">
            
            <SearchBoxIcon/>
            <ResultsCount />
            <Hits hitComponent={SearchHit} />
            <SearchPagination/>
          
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
