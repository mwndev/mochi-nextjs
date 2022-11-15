import { backendURL } from "../../pages/_app";

/* user data related */

export const authenticateUser = async (userData) => {
  //userData.name can be email or username, potentially phone number at some point
  const res = await fetch(
    `${backendURL}/user/auth/${userData.name}/${userData.pass}`
  );
};

export const createUser = async (userData) => {
  //userData should contain username, email,
  const res = await fetch(`${backendURL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const editUserData = async (userData) => {
  //userData should contain address, etc
  const res = await fetch(`${backendURL}/user/data`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const signInWithToken = async (token) => {
  //in this case a google JWT, this creates a user if there isn't one present
};

export const sendToken = async (token) => {
  const res = await fetch(`${backendURL}/jwt/google`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rawToken: token }),
  });
  return await res.json();
};
