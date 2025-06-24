import React from 'react';

const Card = ({ title, children }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

export default Card;
