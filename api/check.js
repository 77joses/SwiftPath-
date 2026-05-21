import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

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
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: "Phone number required"
      });
    }

    // Find user's unlock record
    const { data, error } = await supabase
      .from("unlocks")
      .select("*")
      .eq("phone", phone)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return res.status(200).json({
        unlocked: false,
        generations_remaining: 0,
        message: "No active unlock found"
      });
    }

    if (data.generations_remaining <= 0) {
      return res.status(200).json({
        unlocked: false,
        generations_remaining: 0,
        message: "Generations exhausted"
      });
    }

    // Deduct one generation
    const { data: updated, error: updateError } = await supabase
      .from("unlocks")
      .update({
        generations_remaining: data.generations_remaining - 1
      })
      .eq("id", data.id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({
      unlocked: true,
      generations_remaining: updated.generations_remaining,
      message: "Generation used successfully"
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
