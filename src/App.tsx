import React, { useEffect, useState } from 'react';
import { readBoard } from '../backend/fileService';
import Board from './components/Board';

export interface Task {
  id: string;
  status: string;
  priority: string;
  tags: string[];
  description: string;
  reports: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const load = async () => {
    const data = await readBoard();
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task Board</h1>
      <button onClick={load} className="mb-4 p-2 bg-blue-500 text-white">Обновить</button>
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
