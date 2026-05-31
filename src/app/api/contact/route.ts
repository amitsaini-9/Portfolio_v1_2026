import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "hello@sainiamit.com",
    pass: "a8075DBF@1",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return Response.json({ error: "Name and email required" }, { status: 400 });
    }

    await transporter.sendMail({
      from: '"Amit Saini - Portfolio" <hello@sainiamit.com>',
      to: "hello@sainiamit.com",
      subject: `New hire inquiry from ${name}`,
      html: `
        <h2>New Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p style="color:#666;font-size:12px;">From portfolio.sainiamit.com</p>
      `,
    });

    await transporter.sendMail({
      from: '"Amit Saini" <hello@sainiamit.com>',
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h1 style="color:#000;">Hey ${name}!</h1>
          <p>Thanks for getting in touch. I've received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to connect with me on <a href="https://wa.me/919521153320" style="color:#25D366;">WhatsApp</a>.</p>
          <p>Best,<br><strong>Amit Saini</strong></p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
          <p style="color:#666;font-size:12px;">Software Developer | <a href="https://portfolio.sainiamit.com">portfolio.sainiamit.com</a></p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}
