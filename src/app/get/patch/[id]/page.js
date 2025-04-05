"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
export default function EditPost() {
  const { id } = useParams(); 
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setText(data.text);

    };
    if (id) fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text }),
    });

    if (res.ok) {
      router.push("/get"); 
    } else {
      console.error("Помилка при оновленні поста");
    }
  };

  return (
    <div>
      <h2>Редагування поста</h2>
      <form onSubmit={handleSubmit}>
        <input  type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок"
        />
        <br />
        <textarea value={text} onChange={(e) => setText(e.target.value)}placeholder="Текст"
        ></textarea>
        <br />
        <button type="submit">Оновити</button>
      </form>
    </div>
  );
}

