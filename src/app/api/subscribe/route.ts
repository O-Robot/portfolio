import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();
    const audienceId = "0eec10c8-8937-481e-92aa-db0c9ff2939d";
    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const existing = await resend.contacts.get({
        email,
        audienceId,
      });

      if (existing?.data) {
        await resend.emails.send({
          from: "Ogooluwani Adewale <noreply@ogooluwaniadewale.com>",
          to: [email],
          subject: "Thanks for reaching out 🚀",
          html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border-radius:12px; background:#f8eff4; text-align:center;">
            <img src="https://ogooluwaniadewale.com/icons/favicon.ico" alt="Ogooluwani Logo" width="80" style="margin-bottom:20px;" />
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
        return NextResponse.json({
          success: true,
          message: "Email already subscribed",
        });
      }
    } catch (err: any) {
      if (!err?.message?.includes("not found")) {
        console.error("Error checking contact:", err);
        return NextResponse.json(
          { success: false, message: "Failed to check contact" },
          { status: 500 }
        );
      }
    }
    await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId,
    });

    await resend.emails.send({
      from: "Ogooluwani Adewale <noreply@ogooluwaniadewale.com>",
      to: [email],
      subject: "Thanks for subscribing & reaching out! 🚀",
      html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border-radius:12px; background:#f8eff4; text-align:center;">
            <img src="https://ogooluwaniadewale.com/icons/favicon.ico" alt="Ogooluwani Logo" width="80" style="margin-bottom:20px;" />
            <h2 style="color:#231942;">Hi ${firstName} ${lastName},</h2>
            <p style="color:#655e7a; font-size:16px; line-height:1.5;">
              Thank you for reaching out and subscribing to my newsletter! 🎉
            </p>
            <p style="color:#655e7a; font-size:16px; line-height:1.5;">
              I’ve received your message and will get back to you as soon as possible.
            </p>
            <p style="margin-top:20px; font-size:14px; color:#231942; font-weight:bold;">
              Stay tuned for updates, tips, and exciting content!
            </p>
            <a href="https://ogooluwaniadewale.com" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#e0b1cb; color:#231942; border-radius:6px; text-decoration:none;">
              Visit My Portfolio
            </a>
          </div>
        `,
    });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
