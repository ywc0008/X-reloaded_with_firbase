import { set } from "firebase/database";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, storage } from "../firbase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostTweetForm() {
  const FILE_SIZE = 5 * 1024 * 1024;
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > FILE_SIZE) {
        alert("파일 크기가 너무 큽니다. 5MB 이하로 업로드해주세요.");
        return;
      }
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 ">
      <textarea
        rows={5}
        maxLength={180}
        required
        onChange={onChange}
        value={tweet}
        className="p-5 rounded-2xl text-base navBorder text-white bg-black w-full resize-none placeholder:text-base placeholder:font-sans focus:outline-none focus:border-blue-500"
        placeholder="무슨 일이 일어났나요?"
      ></textarea>
      <label
        htmlFor="file"
        className="py-2 px-0 text-blue-500 text-center rounded-2xl text-sm font-semibold btnBorder"
      >
        {file ? "Photo added" : "사진 추가하기"}
      </label>
      <input
        onChange={onFileChange}
        id="file"
        accept="image/*"
        type="file"
        className="hidden"
      />
      <input
        type="submit"
        value={isLoading ? "Posting" : "트위터 올리기"}
        className="bg-blue-500 border-none py-2 px-0 rounded-2xl text-base cursor-pointer hover:opacity-80 active:opacity-80"
      />
    </form>
  );
}
