import { getUsers } from "./GET-users.js";

export const deleteUser = async(id) => {
  return await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}
