function handleFormSubmit(event) {
  event.preventDefault();

  let myObj = {
    amount: event.target.amount.value,
    dish: event.target.dish.value,
    table: event.target.table.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/6d6759355b9941e5a212cf506ffc0207/restaurantData",
      myObj
    )
    .then((response) => {
      console.log(response);
      domContentLoader();
    })
    .catch((err) => {
      console.log(err);
    });
}

function domContentLoader() {
  axios
    .get(
      "https://crudcrud.com/api/6d6759355b9941e5a212cf506ffc0207/restaurantData"
    )
    .then((response) => {
      const orderData = response.data;

      orderData.forEach((myObj) => {
        showDetailsOnScreen(myObj);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function showDetailsOnScreen(myObj) {
  const string = `${myObj.amount} - ${myObj.dish} - ${myObj.table}`;

  document.getElementById("amount").value = "";
  document.getElementById("dish").value = "";
  document.getElementById("table").value = "";

  const list = document.querySelector("ul");
  const newLi = document.createElement("li");
  const newLiText = document.createTextNode(string);
  newLi.appendChild(newLiText);
  list.appendChild(newLi);

  const deleteBtn = document.createElement("button");
  const deleteBtnText = document.createTextNode("Delete");
  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.className = "delete-btn";
  newLi.appendChild(deleteBtn);

  newLi.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const userToDelete = event.target.parentElement;
      userToDelete.remove();
      deleteUser(myObj._id);
    }
  });
}

function deleteUser(id) {
  // Perform API call to delete user data
  axios
    .delete(
      `https://crudcrud.com/api/6d6759355b9941e5a212cf506ffc0207/restaurantData/${id}`
    )
    .then((response) => {
      removeUserFromScreen(id);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeUserFromScreen(id) {
  const parentNode = document.getElementById("listofitems");
  const ChildNodeToBeRemoved = document.getElementById(id);
  if (ChildNodeToBeRemoved) {
    parentNode.removeChild(ChildNodeToBeRemoved);
  }
}

document.addEventListener("DOMContentLoaded", domContentLoader);
