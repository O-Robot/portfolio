import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const query = `
    query ContributionGraph($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const { searchParams } = new URL(request.url);
  const login =
    searchParams.get("login") || process.env.GITHUB_LOGIN || "o-robot";
  const year = Number(searchParams.get("year")) || new Date().getFullYear();

  const now = new Date();
  let from: string;
  let to: string;

  if (year === now.getFullYear()) {
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    from = oneYearAgo.toISOString();
    to = now.toISOString();
  } else {
    from = new Date(`${year}-01-01T00:00:00Z`).toISOString();
    to = new Date(`${year}-12-31T23:59:59Z`).toISOString();
  }

  const ghRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login, from, to } }),
    cache: "no-store",
  });

  const ghJson = await ghRes.json();

  if (!ghRes.ok || ghJson?.errors) {
    return NextResponse.json(
      { error: ghJson?.errors ?? ghJson },
      { status: 500 }
    );
  }

  const calendar =
    ghJson?.data?.user?.contributionsCollection?.contributionCalendar;

  return NextResponse.json({
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  });
}
