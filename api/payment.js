import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phone, transaction_id, amount } = req.body;

    // Validate amount is correct (20 KSH)
    if (!amount || Number(amount) < 20) {
      return res.status(400).json({
        error: "Invalid payment amount"
      });
    }

    if (!phone || !transaction_id) {
      return res.status(400).json({
        error: "Missing phone or transaction_id"
      });
    }

    // Check if this transaction already exists
    const { data: existing } = await supabase
      .from("unlocks")
      .select("*")
      .eq("transaction_id", transaction_id)
      .single();

    if (existing) {
      return res.status(200).json({
        message: "Already unlocked",
        generations_remaining: existing.generations_remaining
      });
    }

    // Record new payment and unlock
    const { data, error } = await supabase
      .from("unlocks")
      .insert([
        {
          phone,
          transaction_id,
          generations_remaining: 5,
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Unlocked successfully",
      generations_remaining: data.generations_remaining
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
