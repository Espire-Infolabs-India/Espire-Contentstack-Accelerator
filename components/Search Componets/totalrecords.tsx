import { useInstantSearch } from 'react-instantsearch';

export function ResultsCount() {
  const { results } = useInstantSearch();

  if (!results) return null;

  return (
    <p className="text-sm text-gray-600 mt-2">
      Showing {results.nbHits.toLocaleString()} result{results.nbHits !== 1 ? 's' : ''}
    </p>
  );
}
