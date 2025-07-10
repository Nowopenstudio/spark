
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, message
}) => (
  <div>
    <h1 className="uppercase">Thank You, {firstName}!</h1>
    <div style={{whiteSpace: "pre-wrap"}}>{message}</div>
  </div>
);