import React from 'react';
import checkAuth from '../requireAuth';
import Notification from '../notification/NotificationBlock';

const HomePage = () => {
  return (
    <div className="col-xs-12">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default checkAuth(HomePage);
