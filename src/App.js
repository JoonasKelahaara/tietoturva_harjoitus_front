import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function App() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [passwd, setPasswd] = useState('');

  const url = "http://localhost/tietoturva_harjoitustyo/index.php";

  const send = e => {
    e.preventDefault();

    axios.post(url, {
      fname : fname,
      lname: lname,
      uname: uname,
      passwd: passwd
    }).catch(e => console.log(e))
  }

  return (
    <div>
      <form>
        <input value={fname} onChange={e=>setFname(e.target.value)} />
        <input value={lname} onChange={e=>setLname(e.target.value)} />
        <input value={uname} onChange={e=>setUname(e.target.value)} />
        <input value={passwd} onChange={e=>setPasswd(e.target.value)} />
        <button onClick={send}>Register</button>
      </form>
    </div>
  )
}
