//GET data
let dataArray = [];
let divvy = document.createElement("divvy");
let button = document.getElementById("button");
let deleteButton = document.getElementById("deleteButton");
const url = `https://newtodo-d2839-default-rtdb.europe-west1.firebasedatabase.app/todo.json`;

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  let postID = Object.keys(data);

  for (let i = 0; i < postID.length; i++) {
    const urlForPosting = `https://newtodo-d2839-default-rtdb.europe-west1.firebasedatabase.app/todo/${postID[i]}.json`;
    const postingTheNewFetchUrl = await fetch(urlForPosting);
    const postingData = await postingTheNewFetchUrl.json();
    dataArray.push(postingData[i]);
    divvy.innerText = postingData.assignment;
    postingData.date;
    postingData.done;
  }

  return data;
}
getData();

//EVENT LISTENER
button.addEventListener("click", async (event) => {
  event.preventDefault();

  divvy.innerHTML = "";
  let inputAssignment = document.getElementById("inputAssignment").value;
  let inputDate = document.getElementById("inputDate").value;

  //UPDATE DATA
  async function updateData() {
    let newData = {
      assignment: inputAssignment,
      date: inputDate,
      done: false,
    };

    const init = {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(url, init);
    const data = await response.json();
    location.reload();
    return data;
  }

  updateData();
});

//DELETE
// deleteButton.addEventListener("click", () => {
//   async function deleteData() {
//     const init = {
//       method: "DELETE",
//       body: JSON.stringify(),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     };
//     const response = await fetch(url, init);
//     const data = await response.json();
//     location.reload();
//     return data;
//   }
//   deleteData();
// });
