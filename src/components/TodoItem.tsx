import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React from 'react';

type TodoItemType = {
  todo: { id: string; text: string; timestamp: any };
};

const TodoItem: React.FC<TodoItemType> = (props) => {
  const { id, text, timestamp } = props.todo;

  const [update, setUpdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const updateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 選択したアイテムにフォーカスを当てる
    const refInput = updateInput.current;
    if (isEdit === true) {
      if (refInput === null) return;
      refInput?.focus();
    }
  }, [isEdit]);

  const onSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem(id);
  };
  const updateItem = async (id: string) => {
    if (update === '') return;
    await updateDoc(doc(db, 'todos', id), {
      text: update,
      // timestamp: serverTimestamp(),
    });
    setIsEdit(false);
  };
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <li className="todo-item">
      {isEdit === false ? (
        <div onDoubleClick={() => setIsEdit(true)} className='textBtn'>
          <span className='textBtn'>{text}</span>
          <span className='textBtn'>
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </div>
      ) : (
        <div className='textBtn'>
          <form onSubmit={onSubmitUpdate}>
            <input
              type="text"
              className="update-input"
              placeholder={text}
              ref={updateInput}
              onChange={(e) => setUpdate(e.target.value)}
            />
            <button className="updateBtn" onClick={() => updateItem(id)}>
              更新
            </button>
          </form>
        </div>
      )}

      <button className="deleteBtn" onClick={() => deleteItem(id)}>
        削除
      </button>
    </li>
  );
};

export default TodoItem;
