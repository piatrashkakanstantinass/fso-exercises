import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries";
import SetBirthYear from "./SetBirthYear";

const Authors = (props) => {
  const { loading, data } = useQuery(GET_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (loading) return <div>loading...</div>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear />
    </div>
  );
};

export default Authors;