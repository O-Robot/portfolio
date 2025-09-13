import { NextResponse } from "next/server";

export async function GET() {
  try {
    const docId = "161a5eJ0EVI1xSsrYurkGZXMx5ZjuAjWM";
    const googleDocsUrl = `https://docs.google.com/document/d/${docId}/export?format=pdf`;

    const response = await fetch(googleDocsUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Google Docs PDF: ${response.statusText}`
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="ogooluwaniAdewale_software-developer.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to load resume" },
      { status: 500 }
    );
  }
}
