import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Send the email to YOU
    await resend.emails.send({
      from: "Portfolio Contact <no-reply@ogooluwaniadewale.com>",
      to: ["hey@ogooluwaniadewale.com"],
      subject: `New message from ${name}`,
      replyTo: email,
      text: `
        You have a new message from your portfolio form:

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    await resend.emails.send({
      from: "Ogooluwani Adewale <noreply@ogooluwaniadewale.com>",
      to: [email],
      subject: "Thanks for reaching out 🚀",
      text: `Hi ${name},\n\nThanks for reaching out! I’ve received your message and will get back to you as soon as possible.\n\nBest Regards,\nOgooluwani`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
