"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2, Check, Coffee } from "lucide-react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const presetAmounts = [100, 500, 1000, 10000];

export default function SupportMe() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const getAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseInt(customAmount);
    return 0;
  };

  const handlePayment = async () => {
    const amount = getAmount();
    if (!amount || amount < 1) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/support/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, email }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      const { order_id, currency } = await res.json();

      const options = {
        key: "rzp_live_SvrmXaDUtmpmTx",
        amount: amount * 100,
        currency,
        name: "Support Amit Saini",
        description: "Thank you for your support!",
        order_id,
        prefill: { name, email },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/support/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                name,
                email,
                amount,
              }),
            });
            if (verifyRes.ok) {
              setStatus("success");
            } else {
              setStatus("error");
            }
          } catch {
            setStatus("error");
          }
        },
        modal: { ondismiss: () => setStatus("idle") },
        theme: { color: "#8b5cf6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setStatus("error");
      });
      rzp.open();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <section
        id="support"
        className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center p-6 md:p-8 font-primary overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-300 font-medium tracking-widest text-xs mb-6">
              <Coffee className="w-3 h-3" /> SUPPORT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Buy Me a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Coffee
              </span>
            </h2>
            <p className="text-white/50 mt-4 max-w-md mx-auto">
              If you enjoy my work, consider supporting me. Every bit helps me keep creating and building.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 rounded-3xl border border-green-500/20 bg-[#0d0d16]/60 backdrop-blur-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Thank You! 🎉</h3>
              <p className="text-white/60">Your support means the world to me.</p>
              <p className="text-white/40 text-sm mt-2">A confirmation email has been sent.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-[#0d0d16]/60 backdrop-blur-xl p-8"
            >
              {/* Amount Selection */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {presetAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                    className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                      selectedAmount === amount
                        ? "bg-purple-500/20 border-purple-500 text-purple-300"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-purple-500/50"
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <input
                  type="number"
                  placeholder="Custom amount (₹)"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  min="1"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {/* Optional Name & Email */}
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Email for receipt (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                />
              </div>

              {/* Pay Button */}
              <motion.button
                onClick={handlePayment}
                disabled={status === "loading" || (!selectedAmount && !customAmount)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Support {getAmount() > 0 ? `₹${getAmount().toLocaleString()}` : ""}
                  </>
                )}
              </motion.button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center mt-4">Payment failed. Please try again.</p>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
