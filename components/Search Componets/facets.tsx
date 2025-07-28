import { RefinementList } from 'react-instantsearch';

export function Facets() {
  
function formatContentType(label: string) {
  return label
    .replace(/^_/, '') // remove leading underscore
    .replace(/_/g, ' ') // replace underscores with spaces
    .replace(/\d+$/, '') // remove trailing digits (like blog_post11 → blog_post)
    .replace(/\s+$/, '') // trim end
    .replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize each word
    .trim();
}

  return (
       <aside className="md:col-span-1 border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-700 mb-3">Tags</h4>
                <RefinementList attribute="topic" classNames={{
    count: 'ml-2 text-gray-500 font-semibold', // adds space before count
    labelText: 'ml-2 text-gray-500'
  }}/>
    
    
                <div>
            <h4 className="font-semibold text-gray-700 mb-2">Content Type</h4>
           <RefinementList
  attribute="content_type"
  transformItems={(items) =>
    items.map((item) => ({
      ...item,
      label: formatContentType(item.label),
    }))
  }classNames={{
    count: 'ml-2 text-gray-500 font-semibold', // adds space before count
    labelText: 'ml-2 text-gray-500'
  }}
/>
          </div>
              </aside>
  );
}
