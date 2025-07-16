import { RefinementList } from 'react-instantsearch';

export function Facets() {
  

  return (
       <aside className="md:col-span-1 border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-700 mb-3">Tags</h4>
                <RefinementList attribute="topic" />
    
    
                <div>
            <h4 className="font-semibold text-gray-700 mb-2">Content Type</h4>
            <RefinementList attribute="content_type" />
          </div>
              </aside>
  );
}
