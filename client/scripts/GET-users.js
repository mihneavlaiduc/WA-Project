import { closeModal } from "../utils/closeModal.js";
import { openModal } from "../utils/openModal.js";
import { deleteUser } from "./DELETE-user.js";
import { getUser } from "./GET-user.js";

export const getUsers = () => {
  const memberCardContainer = document.getElementById("aside-bar");
  fetch("http://localhost:3000/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((el) => {
        //let cardContent=`<div id="member-card-top"><div class="profile-picture"><div id="profile-picture-text">JD</div></div><div class="card-info"><div id="card-info-name">${}</div><div id="card-info-id">ID: 7c446b53-da83-40b2-9555-734155dc16cf</div><div id="card-info-email">john.doe@softvision.com</div></div></div><div id="member-card-bot"><button class="delete-button">Delete</button><button class="edit-button">Edit</button></div>`


        const memberCard = document.createElement("div");
        memberCard.setAttribute("class", "member-card");
        memberCardContainer.appendChild(memberCard);
        const cardTop = document.createElement("div");
        cardTop.setAttribute("id", "member-card-top");
        memberCard.appendChild(cardTop);

        const profilePicture = document.createElement("div");
        profilePicture.setAttribute("class", "profile-picture");
        cardTop.appendChild(profilePicture);

        const profilePictureText = document.createElement("div");
        profilePictureText.setAttribute("class", "profile-picture-text");
        profilePictureText.innerHTML = `${el.firstName[0]}${el.lastName[0]}`;
        profilePicture.appendChild(profilePictureText);

        const cardInfo = document.createElement("div");
        cardInfo.setAttribute("class", "card-info");
        cardTop.appendChild(cardInfo);

        const name = document.createElement("div");
        name.innerHTML = `${el.firstName} ${el.lastName}`;
        name.setAttribute("id", "card-info-name");
        cardInfo.appendChild(name);

        const id = document.createElement("div");
        id.innerHTML = `ID: ${el.id}`;
        id.setAttribute("class", "card-info-id");
        cardInfo.appendChild(id);

        const email = document.createElement("div");
        email.innerHTML = `${el.firstName.toLowerCase(
          el.firstName
        )}.${el.lastName.toLowerCase(el.lastName)}@softvision.com`;
        email.setAttribute("class", "card-info-email");
        cardInfo.appendChild(email);

        const cardBot = document.createElement("div");
        cardBot.setAttribute("id", "member-card-bot");
        memberCard.appendChild(cardBot);

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-button");
        deleteButton.innerHTML = "Delete";
        cardBot.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-button");
        editButton.innerHTML = "Edit";
        cardBot.appendChild(editButton);

        editButton.addEventListener("click", async () => {
          const userData = await getUser(el.id);
          Array.from(document.getElementsByClassName("edit-first-name")).forEach((input) => {
               input.value = userData.firstName;
          });
          Array.from(document.getElementsByClassName("edit-last-name")).forEach((input) => {
            input.value = userData.lastName;
          });

          Array.from(document.getElementsByClassName("edit-address")).forEach((input) => {
            input.value = userData.address.streetAndNumber;
          });
          const editId = document.getElementById("ghost-div");
          Array.from(document.getElementsByClassName("edit-zip-code")).forEach((input) => {
            input.value = userData.address.postalCode;
          });
          Array.from(document.getElementsByClassName("edit-city")).forEach((input) => {
            input.value = userData.address.city;
          });
          Array.from(document.getElementsByClassName("edit-country")).forEach((input) => {
            input.value = userData.address.country;
          });
          Array.from(document.getElementsByClassName("edit-age")).forEach((input) => {
            input.value = userData.age;
          });
          
          const editGender = Array.from(document.getElementsByClassName("edit-gender"));
          editGender.forEach((input) => {
              Array.from(input.options).forEach(option_element => {
                if(el.gender === option_element.value) {
                  option_element.selected = true;
                }
              })
          })

          const editProfessional = Array.from(document.getElementsByClassName("edit-professional"));
          const editAmateur = Array.from(document.getElementsByClassName("edit-amateur"));

          if (el.activity_class === "professional") {
            editProfessional.forEach(input => {
              input.checked = true;
            })
            editAmateur.forEach(input => {
              input.checked = false;
            })
          } else if (el.activity_class === "amateur") {
            editProfessional.forEach(input => {
              input.checked = false;
            })
            editAmateur.forEach(input => {
              input.checked = true;
            })
          }

          editId.innerHTML = userData.id;

          Array.from(document.getElementsByClassName("edit-input")).forEach((sport) => {
              sport.checked = false;
            }
          );
          var filter;
          var sportsLength = el.sports.length;
          while(sportsLength) {
            el.sports.forEach(sport => {
              const radioButtons = Array.from(document.getElementsByClassName("edit-input"));
              filter = radioButtons.filter((element) => element.name === sport);
              filter.forEach((sport) => {
                sport.checked = true;
              })
            })
            sportsLength -= 1;
          }
          if(window.screen.width <= 1025) {
            document.getElementById("add-member-container-1024").style.display = "none";
            document.getElementById("edit-member-container-1024").style.display = "block";
            document.getElementById("back-button-1024").style.display = "block";
          }
        });
        deleteButton.addEventListener("click", async () => {
          const modalText = document.getElementById("modal-content");
          const userData = await getUser(el.id);
          modalText.innerHTML = `Are you sure you want to delete member: ${userData.firstName} ${userData.lastName}`;
          openModal();
          const yesButton = document.getElementById("modal-yes-button");
          yesButton.addEventListener("click", async () => {
            const cardId = await deleteUser(el.id);
            Array.from(document.getElementsByClassName("card-info-id")).forEach(
              (card) => {
                if (cardId === card.innerHTML.split(" ")[1]) {
                  card.parentElement.parentElement.parentElement.remove();
                  modalText.innerHTML = ""
                  closeModal();
                }
              }
            );
          });
          const noButton = document.getElementById("modal-no-button");
            noButton.addEventListener('click', () => {
                closeModal();
            })
        });

      });
    });
};