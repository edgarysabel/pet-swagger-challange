import http from "k6/http";
import { check, sleep } from "k6";

// Define API endpoint
const API_ENDPOINT = "https://petstore.swagger.io/v2";

export const options = {
  vus: 200,
  duration: "5m",
};

// Generate random user and ID code
function generateUser() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let username = "";
  let firstName = "John";
  let lastName = "Doe";
  let email = "";
  for (let i = 0; i < 6; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  email = `${username}@example.com`;
  const password = "Password123";
  const phone = "1234567890";
  const userStatus = 0;
  return { username, firstName, lastName, email, password, phone, userStatus };
}

function generateIdCode() {
  return Math.floor(Math.random() * (9999 - 1930 + 1)) + 1930;
}

export default function () {
  let user = generateUser();
  let idCode = generateIdCode();

  // Create User
  let createUserRes = http.post(
    `${API_ENDPOINT}/user`,
    JSON.stringify({
      id: idCode,
      ...user,
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  // Assertions for Create User
  check(createUserRes, {
    "Create User - Status is 200": (r) => r.status === 200,
    "Create User - Response Time < 500ms": (r) => r.timings.duration < 500,
    "Create User - Content-Type is application/json": (r) =>
      r.headers["Content-Type"] === "application/json",
    "Create User - ID matches": (r) => r.json().message === idCode.toString(),
  });

  sleep(1);

  // Search User
  let searchUserRes = http.get(`${API_ENDPOINT}/user/${user.username}`);
  // Assertions for Search User
  check(searchUserRes, {
    "Search User - Status is 200": (r) => r.status === 200,
    "Search User - Response Time < 500ms": (r) => r.timings.duration < 500,
    "Search User - User details are correct": (r) => {
      const resp = r.json();
      return resp.username === user.username && resp.email === user.email;
    },
  });

  sleep(1);

  // Modify User
  user.firstName = "Jane";
  let modifyUserRes = http.put(
    `${API_ENDPOINT}/user/${user.username}`,
    JSON.stringify({
      id: idCode,
      ...user,
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  // Assertions for Modify User
  check(modifyUserRes, {
    "Modify User - Status is 200": (r) => r.status === 200,
    "Modify User - Response Time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  // Search Modified User
  let searchModifiedUserRes = http.get(`${API_ENDPOINT}/user/${user.username}`);
  // Assertions for Search Modified User
  check(searchModifiedUserRes, {
    "Search Modified User - Status is 200": (r) => r.status === 200,
    "Search Modified User - First name is updated": (r) =>
      r.json().firstName === "Jane",
  });

  sleep(1);

  // Delete User
  let deleteUserRes = http.del(`${API_ENDPOINT}/user/${user.username}`);
  // Assertions for Delete User
  check(deleteUserRes, {
    "Delete User - Status is 200": (r) => r.status === 200,
    "Delete User - Response Time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  // Verify User Deletion
  let verifyDeleteRes = http.get(`${API_ENDPOINT}/user/${user.username}`, {
    tags: { type: "verifyDelete" },
  });
  // Assertions for Verify User Deletion
  check(verifyDeleteRes, {
    "Verify User Deletion - Status is 404": (r) => r.status === 404,
    "Verify User Deletion - Response Time < 500ms": (r) =>
      r.timings.duration < 500,
  });
}
