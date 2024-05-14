import { useState } from "react";

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form>
        <input
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
}
