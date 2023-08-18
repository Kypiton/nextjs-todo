import Todo from '../components/Todo'
import { useState, useEffect } from 'react';
import { Rubik } from 'next/font/google'
import { ITodo } from '../types/todo';
import { v4 as uuidv4 } from 'uuid';

const rubik = Rubik({
  weight: '400',
  subsets: ['latin'] 
})

export default function Home() {
  const [changeTodo, setChangeTodo] = useState<Array<ITodo>>([]);
  const [newTodo, setNewTodo] = useState('');
  const lengthTodo = changeTodo.length;

  useEffect(() => {
    setChangeTodo(JSON.parse(localStorage.getItem('changeTodo')!) || []);
  }, []);

  useEffect(() => {
    if (!changeTodo.length) return;
    localStorage.setItem('changeTodo', JSON.stringify(changeTodo));
  }, [changeTodo]);

  const isCompletedTask = (id: string) => {
      const copy = [...changeTodo];
      const current = copy.find(t => t.id === id);
      if (current) {
        current.isCompleted = !current.isCompleted;
      }
      setChangeTodo(copy);
  }

  const deleteTask = (id: string) => {
    setChangeTodo(changeTodo.filter(todo => todo.id !== id))
    if (changeTodo.length === 1) {
      localStorage.setItem('changeTodo', JSON.stringify([]));
    }
  }

  const deleteCompletedTasks = () => {
    setChangeTodo(changeTodo.filter(todo => !todo.isCompleted ? addTask : null))
  }

  const deleteAllTasks = () => {
    localStorage.removeItem('changeTodo');
    setChangeTodo([]);
  }

  const addTask = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (newTodo === '') return;
    setChangeTodo([...changeTodo, {
      id: uuidv4(),
      isCompleted: false,
      name: newTodo
    }]);
    setNewTodo('');
  }

  return (
    <main
      className={`px-48 pt-20 pb-12 ${rubik.className} max-[750px]:px-24 max-[420px]:px-12 max-[420px]:pt-10 max-[420px]:pb-6`}
    >
      <h1 className={'text-5xl text-emerald-500 max-[750px]:text-3xl max-[750px]:text-center max-[420px]:text-xl'}>Daily To Do List</h1>
      <form action="" className={`flex items-center justify-between mt-8 relative`} onSubmit={addTask}>
        <input 
          type="text"
          className={'rounded-xl outline-0 border-2 border-indigo-500/100 py-5 pl-5 pr-24 w-full max-[750px]:p-3 max-[750px]:py-3 max-[750px]:pl-3 max-[750px]:pr-16 max-[750px]:text-sm'} 
          placeholder="Add new list item"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          required />
        <button className={`py-3 px-6 bg-emerald-500 text-white rounded absolute top-2.5 right-2 max-[750px]:py-1.5 max-[750px]:px-3 max-[750px]:top-1.5`}>Add</button>
      </form>
      <Todo 
        changeTodo={changeTodo}
        isCompletedTask={isCompletedTask} 
        deleteTask={deleteTask} />
        
      {!lengthTodo && 
        <h2 className={'text-4xl text-indigo-500/100 text-center max-[750px]:text-xl'}>No to-do items found.</h2>
      }
      <hr className={'mt-40 max-[420px]:mt-28'}/>
      <div className={'flex items-center justify-around max-[1000px]:flex-wrap'}>
        <p className={'pt-6'}>{lengthTodo} item{lengthTodo === 1 ? '' : 's'}</p>
        <p onClick={deleteCompletedTasks} className={'cursor-pointer hover:text-blue-600 pt-6 text-center'}>Delete tasks that have been completed</p>
        <p onClick={deleteAllTasks} className={'cursor-pointer hover:text-blue-600 pt-6'}>Clear All</p>
      </div>
    </main>
  )
}
