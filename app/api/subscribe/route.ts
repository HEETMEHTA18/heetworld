import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

interface Subscriber {
  email: string;
  name?: string;
  subscribedAt: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  if (!existsSync(SUBSCRIBERS_FILE)) {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
    return [];
  }
  const data = await readFile(SUBSCRIBERS_FILE, "utf-8");
  return JSON.parse(data);
}

async function saveSubscribers(subscribers: Subscriber[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const subscribers = await getSubscribers();

    const exists = subscribers.some(
      (s) => s.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    subscribers.push({
      email: normalizedEmail,
      name: name?.trim() || undefined,
      subscribedAt: new Date().toISOString(),
    });

    await saveSubscribers(subscribers);

    return NextResponse.json({
      message: "Subscribed successfully!",
      total: subscribers.length,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({
      total: subscribers.length,
      subscribers,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch subscribers." },
      { status: 500 }
    );
  }
}
