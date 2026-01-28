import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      subject,
      message,
      subscribe,
      captchaToken,
    } = await req.json();

    if (!captchaToken) {
      return NextResponse.json(
        { error: "Captcha token missing" },
        { status: 400 },
      );
    }

    if (
      /^[A-Za-z0-9]{20,}$/.test(firstName) ||
      /^[A-Za-z0-9]{20,}$/.test(lastName)
    ) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: captchaToken,
        }),
      },
    );

    const data = await verifyRes.json();
    if (!data.success) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 403 },
      );
    }

    await resend.emails.send({
      from: "Portfolio Contact <no-reply@ogooluwaniadewale.com>",
      to: ["hey@ogooluwaniadewale.com"],
      subject: `${subject}`,
      replyTo: email,
      text: `
        You have a new message from your portfolio form:

        Firstname: ${firstName}
        Lastname: ${lastName}
        Email: ${email}
        Message: ${message}
        Phone: ${phone}
        Subscribe to Newsletter: ${subscribe ? "Yes" : "No"}
      `,
    });

    if (!subscribe) {
      await resend.emails.send({
        from: "Ogooluwani Adewale <noreply@ogooluwaniadewale.com>",
        to: [email],
        subject: "Thanks for reaching out 🚀",
        html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border-radius:12px; background:#f8eff4; text-align:center;">
            <img src="https://ogooluwaniadewale.com/favicon.ico" alt="Ogooluwani Logo" width="80" style="margin-bottom:20px;" />
            <h2 style="color:#231942;">Hi ${firstName} ${lastName},</h2>
            <p style="color:#655e7a; font-size:16px; line-height:1.5;">
             Thank you for reaching out 🎉
            </p>
            <p style="color:#655e7a; font-size:16px; line-height:1.5;">
              I’ve received your message and will get back to you as soon as possible.
            </p>
            <p style="margin-top:20px; font-size:14px; color:#231942; font-weight:bold;">
              Best Regards,\nOgooluwani
            </p>
            <a href="https://ogooluwaniadewale.com" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#e0b1cb; color:#231942; border-radius:6px; text-decoration:none;">
              Visit My Portfolio
            </a>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
