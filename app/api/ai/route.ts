import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_API_KEY,
});

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });
    const message = response.choices[0].message.content;
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("Error in AI call:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}