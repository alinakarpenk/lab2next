"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function GetPosts() {
    const [posts, setPosts] = useState(null);
    const [message, setMessage] = useState('');
    const router = useRouter(); // <-- переконайся, що це є

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error(`Помилка: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setPosts(data.rows || []);
                console.log("Fetched posts:", data.rows);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        console.log("Deleting post with ID:", id);
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
            setPosts(posts.filter(post => post.id !== id));
            setMessage("Пост успішно видалено");
        } else {
            setMessage("Помилка при видаленні поста");
        }
    };

    const handleEdit = (id) => {
        router.push(`/get/patch/${id}`);
    };

    return (
        <div>
            <h2>Список постів</h2>
            {posts === null ? (
                <p>Завантаження...</p>
            ) : posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h4>{post.title}</h4>
                            <p>{post.text}</p>
                            {post.User && <p>Автор: {post.User.login}</p>}
                            <button onClick={() => handleDelete(post.id)}>Видалити</button>
                            <button onClick={() => handleEdit(post.id)}>Редагувати</button>

                        </li>
                    ))}
                           <p>{message}</p>
                </ul>
            ) : (
                <p>Немає даних для відображення</p>
            )}
        </div>
    );
}

