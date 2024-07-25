import { type User } from "../types";

interface Props {
  users: User[];
  showColor: boolean;
  deleteUser: (id: string) => void;
}

const UsersList = ({ users, showColor, deleteUser }: Props) => {
  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.login.uuid} className={`${showColor && "color"}`}>
            <td>
              <img src={user.picture.large} alt="user photo" width={50} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => deleteUser(user.login.uuid)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
