// pages/api/webhooks.js

import * as Ably from 'ably';
export async function POST(req, res) {
  const ably = new Ably.Realtime(process.env.ABLY_API_KEY);

  const newTransaction = req.body;
  // Broadcast the new transaction to connected clients via Ably
  const channel = ably.channels.get("transactions-channel");
  channel.publish("newTransaction", newTransaction);
  return res.status(200).json({ success: true });
}
