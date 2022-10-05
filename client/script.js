import { mediaQuery } from "./media/mediaQuery.js";
import { getUsers } from "./scripts/GET-users.js";
import { createUser } from "./scripts/POST-user.js";
import { updateUser } from "./scripts/PUT-user.js";

getUsers();
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", async () => {
  await createUser();
});
const saveButton1024 = document.getElementById("save-button-1024");
saveButton1024.addEventListener("click", async () => {
  await createUser();
});
const updateButton = document.getElementById("update-button");
updateButton.addEventListener("click", async () => {
  await updateUser();
});
const updateButton1024 = document.getElementById("update-button-1024");
updateButton1024.addEventListener("click", async() => {
  await updateUser();
})

const backButton = document.getElementById("back-button-1024");
backButton.addEventListener("click", () => {
  document.getElementById("add-member-container-1024").style.display = "block";
  document.getElementById("edit-member-container-1024").style.display = "none";
  backButton.style.display = "none";
});
mediaQuery();
