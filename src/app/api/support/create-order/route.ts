import { NextRequest } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_live_SvrmXaDUtmpmTx",
  key_secret: "43J1UxOJuGUZ17EHtzGFI4Hz",
});

export async function POST(request: NextRequest) {
  try {
    const { amount, name, email } = await request.json();

    if (!amount || amount < 100) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `sup_${Date.now()}`,
      notes: { name: name || "Anonymous", email: email || "", type: "support" },
    });

    return Response.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error("Razorpay error:", err);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
