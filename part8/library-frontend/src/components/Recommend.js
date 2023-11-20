import { useQuery } from "@apollo/client";
import { GET_BOOKS, USER_DATA } from "../queries";
import BookList from "./BookList";

export default function Recommend({ show }) {
  const { data, loading } = useQuery(USER_DATA);
  const genre = data?.me.favoriteGenre;
  const bookQuery = useQuery(GET_BOOKS, { variables: { genre } });
  if (!show) return null;
  if (loading || bookQuery.loading) return <div>loading...</div>;

  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{data.me.favoriteGenre}</b>
      </p>
      <BookList books={bookQuery.data.allBooks} />
    </>
  );
}
