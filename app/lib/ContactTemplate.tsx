
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: any;
  email: any
}

export const ContactTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, message, email
}) => (
  <div>
    <h1 className="uppercase">New Message from, {firstName}:</h1>
    <p>{message}</p>
    <p>email: {email}</p>
  </div>
);