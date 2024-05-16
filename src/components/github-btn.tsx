import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firbase";
import { useNavigate } from "react-router-dom";

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span
      onClick={onClick}
      className="bg-white font-medium mt-12 py-3 px-5 border-none rounded-3xl flex gap-1 justify-center items-center text-black w-full cursor-pointer"
    >
      <img className="h-6" src="/github-logo.svg" alt="" /> 깃허브로 로그인하기
    </span>
  );
}
