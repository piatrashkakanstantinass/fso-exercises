import { useApolloClient, useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const { loading, data } = useQuery(GET_BOOKS, { variables: { genre } });
  const allBooksQuery = useQuery(GET_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    client.refetchQueries({ include: [GET_BOOKS] });
  }, [genre, client]);

  useEffect(() => {
    if (allBooksQuery.data && !allBooksQuery.loading) {
      const genresMap = {};
      allBooksQuery.data.allBooks.forEach((b) =>
        b.genres.forEach((g) => (genresMap[g] = true))
      );
      setGenres(Object.keys(genresMap));
    }
  }, [allBooksQuery.data, allBooksQuery.loading]);

  if (!props.show) {
    return null;
  }
  if (loading) return <div>loading...</div>;

  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

      {genre !== null && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
