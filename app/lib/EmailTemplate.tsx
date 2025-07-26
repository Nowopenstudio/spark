
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: any;
  email:string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, message, email
}) => (
  <div>
      <h1 className="uppercase">New Message from, {firstName}:</h1>
    <p>{message}</p>
    <p>Name: {firstName}</p>
    <p>Email: {email}</p>
  </div>
);