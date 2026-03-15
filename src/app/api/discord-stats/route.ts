import { NextResponse } from 'next/server';

export async function GET() {
  const guildId = process.env.DISCORD_GUILD_ID;
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!guildId || !token) {
    return NextResponse.json({ error: "Missing Discord credentials in server environment." }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
      {
        headers: {
          Authorization: `Bot ${token}`,
        },
        // Revalidate every 30 seconds to cache it locally against Vercel/NextJS spamming
        next: { revalidate: 30 }
      }
    );

    if (!response.ok) {
        return NextResponse.json({ error: "Discord API fetch failed" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      members: data.approximate_member_count || 0,
      online: data.approximate_presence_count || 0
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal API Error" }, { status: 500 });
  }
}
