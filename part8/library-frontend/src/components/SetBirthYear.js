import { useMutation, useQuery } from "@apollo/client";
import { EDIT_AUTHOR, GET_AUTHORS, GET_BOOKS } from "../queries";

export default function SetBirthYear() {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [GET_AUTHORS, GET_BOOKS],
  });
  const { loading, data } = useQuery(GET_AUTHORS);
  function handleSubmit(e) {
    e.preventDefault();
    editAuthor({
      variables: {
        name: e.target.name.value,
        setBornTo: Number(e.target.born.value),
      },
    });
  }

  if (loading) return <div>loading...</div>;

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select id="name" autoComplete="off">
            {data.allAuthors.map((a) => (
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input id="born" />
        </div>
        <button>update author</button>
      </form>
    </>
  );
}
