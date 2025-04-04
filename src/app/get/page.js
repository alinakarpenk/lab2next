"use client";
import { useEffect, useState } from "react";

export default function GetPosts() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error(`Помилка: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setPosts(data.rows || []); 
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <h2>Список постів</h2>
            {posts === null ? (
                <p>Завантаження...</p>
            ) : posts.length > 0 ? (
                <ul>
                    {posts.map((post, index) => (
                        <li key={index}>
                            <h4>{post.title}</h4>
                            <p>{post.text}</p>
                            {post.User && <p>Автор: {post.User.login}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Немає даних для відображення</p>
            )}
        </div>
    );
}
