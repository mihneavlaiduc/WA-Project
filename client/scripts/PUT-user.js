export const updateUser = async () => {

  if (window.screen.width <= 1025) {

    var firstName = document.getElementById("edit-first-name-1024").value;
    var lastName = document.getElementById("edit-last-name-1024").value;
    var idToParse = document.getElementById("ghost-div").innerHTML;
    var address = document.getElementById("edit-address-1024").value;
    var zipCode = document.getElementById("edit-zip-code-1024").value;
    var city = document.getElementById("edit-city-1024").value;
    var country = document.getElementById("edit-country-1024").value;
    var age = document.getElementById("edit-age-1024").value;
    var gender = document.getElementById("edit-gender-1024").value;

    var activityClass = "";
    if (document.getElementById("edit-professional").checked) {
      activityClass = "professional";
    } else if (document.getElementById("edit-amateur").checked) {
      activityClass = "amateur";
    }
    var updatedSports = [];
    Array.from(document.getElementsByClassName("edit-input")).forEach(
      (sport) => {
        if (sport.checked === true) {
          updatedSports.push(sport.id.split("-")[1]);
        }
      }
    );
  } else {
    var firstName = document.getElementById("edit-first-name").value;
    var lastName = document.getElementById("edit-last-name").value;
    var idToParse = document.getElementById("ghost-div").innerHTML;
    var address = document.getElementById("edit-address").value;
    var zipCode = document.getElementById("edit-zip-code").value;
    var city = document.getElementById("edit-city").value;
    var country = document.getElementById("edit-country").value;
    var age = document.getElementById("edit-age").value;
    var gender = document.getElementById("edit-gender").value;

    var activityClass = "";
    if (document.getElementById("edit-professional").checked) {
      activityClass = "professional";
    } else if (document.getElementById("edit-amateur").checked) {
      activityClass = "amateur";
    }
    var updatedSports = [];
    Array.from(document.getElementsByClassName("edit-input")).forEach(
      (sport) => {
        if (sport.checked === true) {
          updatedSports.push(sport.id.split("-")[1]);
        }
      }
    );
  }

  const putBody = {
    id: idToParse,
    firstName: firstName,
    lastName: lastName,
    address: {
      streetAndNumber: address,
      postalCode: zipCode,
      city: city,
      country: country,
    },
    sports: updatedSports,
    gender: gender,
    age: age,
    activity_class: activityClass,
  };
  return await fetch(`http://localhost:3000/users/${idToParse}`, {
    method: "PUT",
    body: JSON.stringify(putBody),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      Array.from(document.getElementsByClassName("card-info-id")).forEach(
        (el) => {
          if (idToParse === el.innerHTML.split(" ")[1]) {
            el.previousSibling.innerHTML = `${firstName} ${lastName}`;
            el.parentElement.parentElement.firstChild.firstChild.innerHTML = `${firstName[0]}${lastName[0]}`;
            el.nextSibling.innerHTML = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@softvision.com`;
          }
        }
      );
    });
};
