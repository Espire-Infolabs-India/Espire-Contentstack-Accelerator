import { SearchBox , Hits, } from 'react-instantsearch';
import { SearchHit  } from "./SearchHit"
export function SearchBoxIcon() {
  

  return (
       <SearchBox
                     classNames={{
                       root: '',
                       form: 'flex',
                       input: 'w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                       submit: 'hidden',
                       reset: 'hidden',
                     }}
                     placeholder="Search articles..."
                   />
  );
}
 