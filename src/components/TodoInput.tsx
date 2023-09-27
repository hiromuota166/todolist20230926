import React from 'react'
import { useState } from 'react';
import { db } from '../firebase.js';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const TodoInput:React.FC = () => {
  const [inputText,setInputText] = useState('');


  const onSubmitAdd = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputText ==='')return;
    await addDoc(collection(db,'todos'),{
      text:inputText,
      timestamp:serverTimestamp(),
    });
    setInputText('');
  };

  return (
    <form onSubmit = {onSubmitAdd} style = {{display:'inline'}}>
      <input 
      onChange={(e) => setInputText(e.target.value)} 
      value = {inputText}
      title='追加ボタン'/>
      <button>追加</button>
    </form>
  );
};

export default TodoInput;