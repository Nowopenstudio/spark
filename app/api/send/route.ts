import { EmailTemplate } from '@/app/lib/EmailTemplate';
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest, res:NextResponse) {
    const body = await req.json();
    const { name, email, subject, message, sender  } = body;

  try {

    const { data, error } = await resend.emails.send({
      from: email,
      to: email,
      subject: subject,
      react: EmailTemplate({ firstName: name, message:message, email:sender  }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}