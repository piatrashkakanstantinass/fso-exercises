import { getUsers } from "../services/users";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function UserList() {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  let body = null;

  if (isLoading) {
    body = <p>Loading...</p>;
  } else if (isError) {
    body = <p>Error: {error.message}</p>;
  } else {
    body = (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <h2>Users</h2>
      {body}
    </>
  );
}
