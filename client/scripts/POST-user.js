import { closeModal } from "../utils/closeModal.js";
import { openModal } from "../utils/openModal.js";
import { deleteUser } from "./DELETE-user.js";
import { getUser } from "./GET-user.js";

const checkInputText = (element) => {
  if (!element.match("[a-zA-Z]+")) {
    return false;
  }
  return true;
};
const checkInputNumber = (element) => {
  if (!element.match("[0-9]+")) {
    return false;
  }
  return true;
};

export const createUser = async () => {
  var goodToCreate = 1;
  const firstName = document.getElementById("add-first-name-text").value;
  if (checkInputText(firstName) === false || firstName.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect first name!");
  }
  const lastName = document.getElementById("add-last-name-text").value;
  if (checkInputText(lastName) === false || lastName.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect last name!");
  }
  const streetAndNumber = document.getElementById("add-address-text").value;
  if (streetAndNumber.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect address!");
  }
  const zipCode = document.getElementById("add-zip-code-text").value;
  if (checkInputNumber(zipCode) === false || zipCode.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect zip code!");
  }
  const city = document.getElementById("add-city-text").value;
  if (checkInputText(city) === false || city.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect city!");
  }
  const country = document.getElementById("add-country-text").value;
  if (checkInputText(country) === false || country.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect country!");
  }
  const age = document.getElementById("add-age-text").value;

  if (checkInputNumber(age) === false || age.length === 0) {
    goodToCreate = 0;
    console.log("Incorrect age!");
  }

  const gender = document.getElementById("add-gender");
  const genderValue = gender.options[gender.selectedIndex].text;

  let activityClass = "";
  if (document.getElementById("add-professional").checked) {
    activityClass = "professional";
  } else if (document.getElementById("add-amateur").checked) {
    activityClass = "amateur";
  }

  let sportsToPass = [];
  let sportsArray = Array.from(document.getElementsByClassName("input-sport"));
  for (let i = 0; i < sportsArray.length; i++) {
    if (sportsArray[i].checked === true) {
      sportsToPass.push(sportsArray[i].name);
    }
  }

  const postBody = {
    id: 1,
    firstName: firstName,
    lastName: lastName,
    address: {
      streetAndNumber: streetAndNumber,
      postalCode: zipCode,
      city: city,
      country: country,
    },
    sports: sportsToPass,
    gender: genderValue,
    age: age,
    activityClass: activityClass,
  };
  if (goodToCreate === 1) {
    return await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        document
          .getElementById("user-saved-toast")
          .setAttribute("style", "display: visible");
        setTimeout(() => {
          document
            .getElementById("user-saved-toast")
            .setAttribute("style", "display: none");
        }, 5000);
        let memberCard = document.createElement("div");
        memberCard.setAttribute("class", "member-card");
        memberCard.innerHTML = `<div id="member-card-top"><div class="profile-picture"><div class="profile-picture-text">${
          firstName[0]
        }${
          lastName[0]
        }</div></div><div class="card-info"><div id="card-info-name">${firstName} ${lastName}</div><div class="card-info-id">ID: ${
          res.id
        }</div><div class="card-info-email">${firstName.toLowerCase()}.${lastName.toLowerCase()}@softvision.com</div></div></div><div id="member-card-bot"><button class="delete-button" id="delete-button-${
          res.id
        }">Delete</button><button class="edit-button" id="edit-button-${
          res.id
        }">Edit</button></div>`;
        const cardsContainer = document.getElementById("aside-bar");
        cardsContainer.append(memberCard);

        const editButton = document.getElementById(`edit-button-${res.id}`);
        editButton.addEventListener("click", async () => {
          const userData = await getUser(res.id);

          const editFirstName = document.getElementById("edit-first-name");

          const editLastName = document.getElementById("edit-last-name");

          const editId = document.getElementById("ghost-div");

          const editAddress = document.getElementById("edit-address");

          const editZipCode = document.getElementById("edit-zip-code");

          const editCity = document.getElementById("edit-city");

          const editCountry = document.getElementById("edit-country");

          const editAge = document.getElementById("edit-age");

          const editGender = document.getElementById("edit-gender");

          Array.from(editGender.options).forEach(function (option_element) {
            if (userData.gender === option_element.value) {
              option_element.selected = true;
            }
          });

          if (userData.activity_class === "professional") {
            document.getElementById("edit-professional").checked = true;
            document.getElementById("edit-amateur").checked = false;
          } else if (userData.activity_class === "amateur") {
            document.getElementById("edit-professional").checked = false;
            document.getElementById("edit-amateur").checked = true;
          }

          editFirstName.value = userData.firstName;

          editLastName.value = userData.lastName;

          editId.innerHTML = userData.id;

          editAddress.value = userData.address.streetAndNumber;

          editZipCode.value = userData.address.postalCode;

          editCity.value = userData.address.city;

          editCountry.value = userData.address.country;

          editAge.value = userData.age;

          Array.from(document.getElementsByClassName("edit-input")).forEach(
            (sport) => {
              sport.checked = false;
            }
          );
          userData.sports.forEach((sport) => {
            document.getElementById(`edit-${sport}`).checked = true;
          });
        });
        const deleteButton = document.getElementById(`delete-button-${res.id}`);
        deleteButton.addEventListener("click", async () => {
          const updatedUserData = await getUser(res.id);
          const modalText = document.getElementById("modal-content");
          modalText.innerHTML = `Are you sure you want to delete member: ${updatedUserData.firstName} ${updatedUserData.lastName}`;
          openModal();
          const yesButton = document.getElementById("modal-yes-button");
          yesButton.addEventListener("click", () => {
            deleteUser(res.id);
            memberCard.remove();
            closeModal();
          });
          const noButton = document.getElementById("modal-no-button");
          noButton.addEventListener("click", () => {
            closeModal();
          });
        });
      });
  } else {
    console.log("User not created!");
  }
};
