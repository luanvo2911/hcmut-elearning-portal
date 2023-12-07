import React from 'react';
import { Result } from 'antd';

const ErrorRoute : React.FC = () => (
  <Result
    style={{ backgroundColor: 'white' }}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    // extra={<Button type="primary">Back Home</Button>}
  />
);

export default ErrorRoute;