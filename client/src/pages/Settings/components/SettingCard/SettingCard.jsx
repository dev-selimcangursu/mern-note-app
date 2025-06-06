import React from 'react';
import './SettingCard.css';

function SettingCard({ icon: Icon, title, description }) {
  return (
    <a href="/settings/project" className="settings__card-link">
       <div className="settings__card">
      <Icon className="settings__icon" />
      <h3 className="settings__card-title">{title}</h3>
      <p className="settings__card-desc">{description}</p>
    </div>
    </a>
  );
}

export default SettingCard;
