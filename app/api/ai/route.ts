import {
  createHiteshChaudharySystemPrompt,
  createPiyushGargSystemPrompt,
} from "@/constants/systemPrompt";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"",
  baseURL: "https://api.groq.com/openai/v1",
  // baseURL: "https://api.perplexity.ai",
  // apiKey: process.env.GEMINI_API_KEY,
  apiKey: process.env.GROQ_API_KEY,
  // apiKey: process.env.PERPLEXITY_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, persona, history, currentMood } = await request.json();

    const systemPrompt =
      persona == "hitesh"
        ? createHiteshChaudharySystemPrompt()
        : createPiyushGargSystemPrompt();

    console.log(systemPrompt);

    const moodContext = currentMood ? `
    CURRENT MOOD: You are currently in "${currentMood.name}" mood (${currentMood.emoji}). 
    ${currentMood.description}
    Adjust your response tone and style to match this mood while staying true to your personality.
    ` : '';

    const prompt = `
    TASK:
      Respond to this message: "${message}"
      Speak **as ${persona.name}**.
      ${moodContext}

    RESPONSE GUIDELINES:
      - Reply in friendly **Hinglish** (mix Hindi + English), natural and upbeat.
      - Keep the reply **3-4 lines** (concise and actionable) when needed then give answer more then 2-3 lines.
      - When ask for any type of code when give the code block
      - Voice: practical, project-first, no-nonsense, encouraging — uses simple analogies and real-world examples.
      - Use technical terms in English when needed (e.g., React, Next.js, TypeScript); keep explanations bite-sized.
      - If user asks for steps, give 2-4 short actionable steps or a minimal runnable code snippet (inline).
      - If user asks for resources, suggest “official docs”, “GitHub repo”, or “video tutorial” — don't include external links unless provided.
      - Avoid long theory; prefer hands-on tips and what to build next.
      - End with a short motivating line or emoji (one-liner).
      - Do **not** ask for clarifying questions unless absolutely necessary.
      - Do **not** add comma after and before the response
    `;
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: prompt },
    ];
    const stream = await client.chat.completions.create({
      // model: "openai/gpt-4.1-mini",
      // model: "gemini-2.5-flash-lite",
      // model: "llama-3.3-70b-versatile",
      model: "openai/gpt-oss-120b",
      // model: "sonar-reasoning",
      messages,
      stream: true,
    });
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content })}\n\n`),
            );
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in AI call:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
