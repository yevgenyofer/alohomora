import React from 'react';

interface IProps {
    index: number;
    icon: string;
    title: string;
    subtitle: string;
    is_done: boolean;
    handleTaskClick: (index: number) => void;
}

export const Task: React.FC<IProps> = ({index, icon, title, subtitle, is_done, handleTaskClick}) => (
  <div onClick={() => handleTaskClick(index)} className={`item ${is_done ? 'completed' : ''}`}>
    <img src={icon} alt="" />
    <div className="flex-column">
      <div className="balance">{title}</div>
      <div className="username">{subtitle}</div>
    </div>
  </div>
)