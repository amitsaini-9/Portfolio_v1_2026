import { NextRequest } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

const WEBHOOK_SECRET = "c86ddf4581ebb8a89398934cee6b56f1e0aaa31d70fc746b3808c18679f38ea0";

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
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  console.log("Portfolio webhook event:", event.event);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const email = payment.email || payment.notes?.email;
    const name = payment.notes?.name || "Supporter";
    const amount = payment.amount / 100;

    if (email) {
      await transporter.sendMail({
        from: '"Amit Saini" <hello@sainiamit.com>',
        to: email,
        subject: "Thank you for your support! 🙏",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h1 style="color:#000;">Thank you, ${name}! 🎉</h1>
            <p>Your support of ₹${amount} has been received successfully.</p>
            <p>It means a lot and helps me keep building and creating amazing things.</p>
            <p>Best,<br><strong>Amit Saini</strong></p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
            <p style="color:#666;font-size:12px;">Payment ID: ${payment.id}</p>
          </div>
        `,
      });
    }

    await transporter.sendMail({
      from: '"Portfolio Webhook" <hello@sainiamit.com>',
      to: "hello@sainiamit.com",
      subject: `💰 New support: ₹${amount} from ${name}`,
      html: `
        <h2>Payment Captured</h2>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Payment ID:</strong> ${payment.id}</p>
        <p><strong>Method:</strong> ${payment.method}</p>
      `,
    });
  }

  return Response.json({ received: true });
}
