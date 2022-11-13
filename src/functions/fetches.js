export const authenticateUser = async (userData) => {
  //userData.name can be email or username, potentially phone number at some point
  const res = await fetch(
    `${backendURL}/user/auth/${userData.name}/${userData.pass}`
  );
};
export const createUser = async (userData) => {
  //userData shoudl contain username, email,

  const res = await fetch(`${backendURL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};
