const passwordForm = {
  siteName: document.getElementById("site-name"),
  username: document.getElementById("username-email"),
  password: document.getElementById("password"),
  trigerButton: document.getElementById("register-password-submit"),
};
const passwordsTable = document.querySelector("#view-passwords > table");

const renderPasswords = () => {
  const passwords = localStorage.getItem("passwords");

  if (passwords == null) {
    return;
  } else {
    const parsedPasswords = JSON.parse(passwords);
    const tbody = passwordsTable.querySelector("tbody");

    tbody.innerHTML = "";
    parsedPasswords.forEach((pwd, index) => {
      tbody.innerHTML += `
      <tr>
            <td>
              ${pwd.siteName}
              <img src="./img/copy.png" onClick="navigator.clipboard.writeText('${pwd.siteName}')" alt="copy" class="icon" />
            </td>
            <td>
              ${pwd.username}
              <img src="./img/copy.png" onClick="navigator.clipboard.writeText('${pwd.username}')" alt="copy" class="icon" />
            </td>
            <td>
              <button class="btn-submit btn-copy" onClick="navigator.clipboard.writeText('${pwd.password}')">Copy</button>
            </td>
            <td>
              <button class="btn-submit btn-delete" onClick="deletePwd(${index})">Delete</button>
            </td>
          </tr>
      `;
    });
  }
};
const addPwd = () => {
  const passwords = localStorage.getItem("passwords");

  if (passwords == null) {
    localStorage.setItem(
      "passwords",
      JSON.stringify([
        {
          siteName: passwordForm.siteName.value,
          username: passwordForm.username.value,
          password: passwordForm.password.value,
        },
      ])
    );
  } else {
    let parsedPasswords = JSON.parse(passwords);

    parsedPasswords.unshift({
      siteName: passwordForm.siteName.value,
      username: passwordForm.username.value,
      password: passwordForm.password.value,
    });
    parsedPasswords = JSON.stringify(parsedPasswords);
    localStorage.setItem("passwords", parsedPasswords);
  }
  renderPasswords();

  alert("Password saved successfully!");
};
const deletePwd = (index) => {
  const passwords = JSON.parse(localStorage.getItem("passwords"));

  passwords.splice(index, 1);

  localStorage.setItem("passwords", JSON.stringify(passwords));

  renderPasswords();

  alert("Password deleted successfully!");
};

passwordForm.trigerButton.addEventListener("click", addPwd);

renderPasswords();
