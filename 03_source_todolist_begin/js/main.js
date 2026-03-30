let areaListTask = $("#area-list-task");
let areaForm = $("#area-form");
let btnToggleForm = $("#btn-toggle-form");
let inputId = $("#input-id");
let inputName = $("#input-name");
let inputStatus = $("#input-status");

const ITEM_STATUS = [
  { name: "Small", status: "small", class: "dark" },
  { name: "Medium", status: "medium", class: "info" },
  { name: "High", status: "high", class: "danger" },
];

$(document).ready(() => {
  showItems();
});

$("#btn-toggle-form").click(() => {
  let isShow = $(this).data("toggle-form");
  $(this).data("toggle-form", !isShow);
  toggleForm(!isShow);
});

$("#btn-submit").click((e) => {
  e.preventDefault();
  if (inputId.val()) {
    startEditItem(inputId.val());
  } else {
    addItem();
  }
  resetInput();
});

showItems = () => {
  $.getJSON("http://localhost:4000/api/v1/items", (data) => {
    let content = "";
    if (data) {
      $.map(data.data, (item, index) => {
        let idx = index + 1;
        let id = item.id;
        let name = item.name;
        let status = showItemStatus(item.status);
        content += `
         <tr>
          <td>${idx}</td>
          <td>${name}</td>
          <td>${status}</td>
          <td>
              <button onClick="javascript:editItem('${id}')" class="btn btn-warning">Edit</button>
              <button onClick="javascript:deleteItem('${id}')" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        `;
      });
    }
    areaListTask.html(content);
  });
};

editItem = async (id) => {
  toggleForm(true);
  $.getJSON(`http://localhost:4000/api/v1/items/${id}`, (data) => {
    if (data) {
      let item = data.data[0];
      inputId.val(item.id);
      inputName.val(item.name);
      inputStatus.val(item.status);
    }
  });
};

startEditItem = async (id) => {
  if (inputName.val().trim()) {
    let name = inputName.val();
    let status = inputStatus.val();
    const response = await fetch(
      `http://localhost:4000/api/v1/items/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status }),
      },
    );
    showItems();
    toggleForm(false);
  } else {
    alert("Please fill in all fields");
  }
};

deleteItem = async (id) => {
  let yes = confirm("Are you sure you want to delete this item?");
  if (!yes) return;
  const response = await fetch(
    `http://localhost:4000/api/v1/items/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  showItems();
};

addItem = async () => {
  if (inputName.val().trim()) {
    let name = inputName.val();
    let status = inputStatus.val();
    const response = await fetch("http://localhost:4000/api/v1/items/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, status }),
    });
    showItems();
    toggleForm(false);
  } else {
    alert("Please fill in all fields");
  }
};

showItemStatus = (status) => {
  let itemLevel = ITEM_STATUS.find((item) => item.status === status);
  if (itemLevel) {
    return `<span class="badge bg-${itemLevel.class}">${itemLevel.name}</span>`;
  }
  return "";
};

toggleForm = (isShow = true) => {
  if (isShow) {
    $(areaForm).removeClass("d-none");
    $(btnToggleForm).html("Close");
    $(btnToggleForm).removeClass("btn-info");
    $(btnToggleForm).addClass("btn-danger");
  } else {
    $(areaForm).addClass("d-none");
    $(btnToggleForm).html("Add Task");
    $(btnToggleForm).addClass("btn-info");
    $(btnToggleForm).removeClass("btn-danger");
  }
};

resetInput = () => {
  inputId.val("");
  inputName.val("");
  inputStatus.val("small");
};
