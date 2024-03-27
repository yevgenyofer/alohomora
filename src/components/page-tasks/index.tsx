import { FC } from 'react';
import { Task } from './task';
import { usePageTasksApi } from './hooks';

import './index.scss';

const bg = require('./img/tasks-bg.jpg') as string;

export const PageTasks: FC<{}> = () => {

  const { tasks, handleTaskClick } = usePageTasksApi();

  return (
    <div className="page page-1 page-tasks" style={{ backgroundImage: `url(${bg})` }}>
      
      <div className="content">
        <div>
          <h1>Tasks 🚀</h1>
          <p>
            Earn W-coin rewards by completing simple tasks.
          </p>
        </div>
        <div className="list">
          <div className="items">
            {tasks.map((task, index) => (
              <Task key={index} index={index} {...task} handleTaskClick={handleTaskClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};