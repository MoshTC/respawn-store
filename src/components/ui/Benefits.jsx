import React from 'react';
import { benefitsData } from '../../data/help';

export default function Benefits() {
  return (
    <div className="benefits">
      {benefitsData.map((benefit, index) => (
        <div className="benefit" key={index}>
          <i className={`ti ${benefit.icon}`} aria-hidden="true"></i>
          <div>
            <div className="benefit-title">{benefit.title}</div>
            <div className="benefit-sub">{benefit.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

