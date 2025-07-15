import { Pagination } from 'react-instantsearch';

export function SearchPagination() {
  

  return (
    <div className="flex justify-center mt-8">
       <Pagination
  classNames={{
    root: 'flex flex-wrap justify-center items-center gap-2 mt-6',
    list: 'flex flex-row flex-wrap gap-2', // <- THIS IS CRITICAL
    item: 'border px-3 py-1 rounded text-sm text-gray-700 hover:bg-blue-100',
    selectedItem: 'bg-blue-600 text-white',
    disabledItem: 'opacity-50 cursor-not-allowed',
  }}
/>
</div>
  );
}
