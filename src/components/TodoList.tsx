import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import TodoItem from './TodoItem.tsx';
import React from 'react';

// FireStoreから取得するデータの型を定義する
type TodoListType = {
  id: string;
  text: string;
  timestamp: any;
};

//TodoListという関数型のReactコンポーネントを定義している
const TodoList: React.FC = () => {
  // todosというステートを初期化。このステートは、FireStoreから取得したtodoのリストを保持します。
  const [todos, setTodos] = useState<TodoListType[]>([
    { id: '', text: '', timestamp: null },
  ]);
  // コンポーネントがマウントされたときに実行されるコードブロック
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
    const unSub = onSnapshot(q, async (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        }))
      );
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <>
      {todos[0]?.id && (
        <>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </>
  );
};

export default TodoList;
