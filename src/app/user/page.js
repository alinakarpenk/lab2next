'use client'
import { useState } from 'react';

export default function PostUser() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/users', { method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password,
        password_repeat: passwordRepeat
      })
    })
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Помилка');
    } else {
      setMessage("Користувача успішно додано до БД");
      setLogin('');
      setPassword('');
      setPasswordRepeat('');
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Login" value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <input type="password" placeholder="Password" value={password}
          onChange={(event) => setPassword(event.target.value)}
          />
        <input type="password" placeholder="Repeat Password" value={passwordRepeat}
          onChange={(event) => setPasswordRepeat(event.target.value)}
        />
        <button type="submit">Register</button>
      </form>
       <p>{message}</p>
    </div>
  );
}
