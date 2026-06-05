// lib/auth.js
const USERS = [
  {
    username: "admin",
    password: "1234",
    role: "super",
  },
  {
    username: "geetansh",
    password: "1111",
    role: "user",
  },
  {
    username: "arshit",
    password: "2222",
    role: "user",
  },
  {
    username: "mishra",
    password: "3333",
    role: "user",
  },
];

export const loginUser = (username, password) => {
  const user = USERS.find(
    (u) =>
      u.username === username.trim() &&
      u.password === password.trim()
  );

  if (user) {
   
    localStorage.setItem("loggedUser", user.username);
    localStorage.setItem("userRole", user.role);

    return true;
  }

  return false;
};
