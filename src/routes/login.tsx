import { useState } from "react";
import { auth } from "../firbase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      // 계정생성
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
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
      <h1 className="text-5xl">로그인 X</h1>
      <form
        className="mt-12 mb-2 flex flex-col gap-2 w-full"
        onSubmit={onSubmit}
      >
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
          value={isLoading ? "로딩중..." : "로그인"}
        />
      </form>
      {error !== "" ? (
        <span className="text-red-500 font-semibold">{error}</span>
      ) : null}
      <span className="mt-5">
        계정이 없나요?
        <Link className="text-blue-500  pl-2" to="/create-account">
          회원 가입 &rarr;
        </Link>
      </span>
      <GithubButton />
    </div>
  );
}
