import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firbase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      // 계정생성
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
      // 유저 이름 설정
      // 리다이렉트 홈페이지
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full flex flex-col items-center w-96 py-12 px-0">
      <h1 className="text-5xl">Join X</h1>
      <form
        className="mt-12 mb-2 flex flex-col gap-2 w-full"
        onSubmit={onSubmit}
      >
        <input
          className="py-2 px-5 rounded-2xl border-none w-full text-base text-black"
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름"
          type="text"
          required
        />
        <input
          className="py-2 px-5 rounded-2xl border-none w-full text-base text-black"
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="py-2 px-5 rounded-2xl border-none w-full text-base text-black"
          onChange={onChange}
          name="password"
          value={password}
          placeholder="비밀번호"
          type="password"
          required
        />
        <input
          className="py-2 px-5 rounded-2xl border-none w-full text-base cursor-pointer hover:opacity-80 bg-white text-black"
          type="submit"
          value={isLoading ? "로딩중..." : "계정 생성"}
        />
      </form>
      {error !== "" ? (
        <span className="text-red-500 font-semibold">{error}</span>
      ) : null}
      <span className="mt-5">
        계정이 이미 있나요?
        <Link className="text-blue-500 pl-2" to="/login">
          로그인 &rarr;
        </Link>
      </span>
      <GithubButton />
    </div>
  );
}
