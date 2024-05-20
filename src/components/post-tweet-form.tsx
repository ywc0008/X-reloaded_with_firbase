import { useState } from "react";

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChagne = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      const { files } = e.target;
      if (files && files.length === 1) {
        setFile(files[0]);
      }
    }
  };
  return (
    <form action="" className="flex flex-col gap-2 ">
      <textarea
        rows={5}
        maxLength={180}
        onChange={onChagne}
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
