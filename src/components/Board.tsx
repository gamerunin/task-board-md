import React from 'react';
import { Task } from '../App';

interface Props {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const columns = ['План', 'В работе', 'Тестирование', 'Баги', 'Готово'];

const Board: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="flex space-x-4">
      {columns.map((col) => (
        <div key={col} className="w-64 bg-gray-100 p-2 rounded">
          <h2 className="font-bold mb-2">{col}</h2>
          {tasks
            .filter((t) => t.status === col)
            .map((t) => (
              <div key={t.id} className="bg-white p-2 mb-2 shadow">
                <div className="text-sm text-gray-500">{t.id}</div>
                <div>{t.description}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
