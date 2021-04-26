import React from 'react';
import SwaggerUI from 'swagger-ui-react';

const Home: React.FC = () => {
  return <SwaggerUI url="/configs/swagger.json" />;
};

export default Home;
