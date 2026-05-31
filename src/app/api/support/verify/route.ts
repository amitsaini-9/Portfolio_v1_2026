import { NextRequest } from "next/server";
import crypto from "crypto";
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
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, name, email, amount } = await request.json();

    const expectedSignature = crypto
      .createHmac("sha256", "43J1UxOJuGUZ17EHtzGFI4Hz")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Send thank you email to supporter
    if (email) {
      await transporter.sendMail({
        from: '"Amit Saini" <hello@sainiamit.com>',
        to: email,
        subject: "Thank you for your support!",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h1 style="color:#000;">Thank you, ${name || "friend"}! 🙏</h1>
            <p>Your support of ₹${amount} means the world to me. It helps me keep building and creating.</p>
            <p>I truly appreciate your generosity and belief in my work.</p>
            <p>Best,<br><strong>Amit Saini</strong></p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
            <p style="color:#666;font-size:12px;">Payment ID: ${razorpay_payment_id}</p>
          </div>
        `,
      });
    }

    // Notify yourself
    await transporter.sendMail({
      from: '"Portfolio Support" <hello@sainiamit.com>',
      to: "hello@sainiamit.com",
      subject: `New support: ₹${amount} from ${name || "Anonymous"}`,
      html: `
        <h2>New Support Payment</h2>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Name:</strong> ${name || "Anonymous"}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Verify error:", error);
    return Response.json({ error: "Verification failed" }, { status: 500 });
  }
}
