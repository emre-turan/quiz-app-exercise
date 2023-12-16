import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  console.log("Webhook payload:", payload);
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  // Sync with database
  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, first_name, last_name, image_url, email_addresses } =
        evt.data;
      const email =
        email_addresses && email_addresses[0]
          ? email_addresses[0].email_address
          : "";

      if (id && first_name && last_name && image_url && email) {
        console.log("Syncing user data with database...");
        await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
            firstName: first_name,
            lastName: last_name,
            email: email,
          },
          create: {
            clerkId: id,
            email: email,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
            firstName: first_name,
            lastName: last_name,
          },
        });
        console.log("User data synced successfully.");
      } else {
        console.error("Missing required fields in payload");
        return new Response("Error occured", {
          status: 400,
        });
      }
    } else if (eventType === "user.deleted") {
      const { id } = evt.data;

      if (id) {
        console.log("Deleting user from database...");
        console.log(`ID: ${id}`);

        await prisma.user.delete({
          where: { clerkId: id },
        });

        console.log("User deleted successfully.");
      } else {
        console.error("Missing required fields in payload");
        return new Response("Error occured", {
          status: 400,
        });
      }
    }
  } catch (err) {
    console.error("Error updating database:", err);
    return new Response("Error occured", {
      status: 500,
    });
  }

  return new Response("", { status: 200 });
}
