

const SearchResultComponent = ({ results }) => {
  return (
    <div>
      <h3>Resultados de la búsqueda:</h3>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultComponent;
