import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState(null);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [passwd, setPasswd] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  let data = new FormData(document.querySelector("form"));

  let base64cred = btoa(data.get("user")+":"+data.get("password"))

  const url = "http://localhost/tietoturva_harjoitustyo/";

  useEffect(() => {
    console.log(data.get("user"))
  })

  const send = e => {
    e.preventDefault();

    axios.post(url + "/register.php", {
      fname: fname,
      lname: lname,
      uname: uname,
      passwd: passwd
    }).catch(e => console.log(e))
  }

  const logIn = e => {
    e.preventDefault();

    let config = {
      headers: {
        'Authorization':'Basic ' + base64cred
      },
      withCredentials: true,
      method: 'post'
    }

    axios.post(url + "login.php", config)
      .then((response) => {
        setText(response.data.json());
      }).catch(e => console.log(e))
  }

  return (
    <div>
      <h3>Rekisteröidy:</h3>
      <form className="form" name="form">
        <label>Etunimi:</label>
        <input value={fname} onChange={e=>setFname(e.target.value)} />
        <label>Sukunimi:</label>
        <input value={lname} onChange={e=>setLname(e.target.value)} />
        <label>Käyttäjänimi:</label>
        <input value={uname} onChange={e=>setUname(e.target.value)} />
        <label>Salasana:</label>
        <input value={passwd} onChange={e=>setPasswd(e.target.value)} />
        <button onClick={send}>Register</button>
      </form>
      <h3>Kirjaudu:</h3>
      <form>
        <label>Käyttäjänimi:</label>
        <input value={user} name="user" onChange={e=>setUser(e.target.value)} />
        <label>Salasana:</label>
        <input value={password} name="password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={logIn}>Kirjaudu</button>
      </form>
      <span>{text}</span>
    </div>
  )
}
