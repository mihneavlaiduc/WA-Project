
export const getUser = async (id) => {
  return await fetch(`http://localhost:3000/users/${id}`)
    .then((res) => res.json())
};