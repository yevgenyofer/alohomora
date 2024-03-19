import React from 'react';

interface IProps {
    path: string;
    icon: string;
    label: string;
}

export const Links: React.FC<IProps> = ({path, icon, label}) => (
    <a href={path}>
    <h3>{icon}</h3>
    <span>{label}</span>
  </a>
)