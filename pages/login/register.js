import React, { useState } from "react";
import { createUser } from "../../src/functions/fetches";

export default function register() {
  const [email, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [first, setFirstName] = useState("");
  const [last, setLastName] = useState("");

  return (
    <>
      <span>email</span>
      <input type="text" onChange={(e) => setMail(e.target.value)} />
      <span>pass</span>
      <input type="text" onChange={(e) => setPass(e.target.value)} />
      <span>first name</span>
      <input type="text" onChange={(e) => setFirstName(e.target.value)} />
      <span>last name</span>
      <input type="text" onChange={(e) => setLastName(e.target.value)} />
      <button
        onClick={() =>
          createUser({
            email,
            pass,
            data: {
              name: {
                last,
                first,
              },
            },
          })
        }
      >
        submit
      </button>
    </>
  );
}
