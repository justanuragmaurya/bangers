import { NextRequest } from "next/server";
import { system_prompt } from "@/lib/prompt";
import { GoogleGenAI } from "@google/genai";

export async function POST(req:NextRequest){
    try {
        const { link } = await req.json();

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
        } as const;

        const model = 'gemini-2.5-flash';

        const contents = [
            {
                role: 'user',
                parts: [
                    { text: system_prompt },
                    {
                        fileData: {
                            fileUri: `${link}`,
                            mimeType: 'video/*',
                        },
                    },
                    { text: "Create from this " },
                ],
            },
        ];

        const gen = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        const encoder = new TextEncoder();

        const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
                try {
                    for await (const chunk of gen as AsyncGenerator<any>) {
                        const text = (chunk && (chunk as any).text) ?? (chunk?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? "").join("") ?? "");
                        if (text) {
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                    controller.close();
                } catch (err) {
                    controller.error(err);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        });
    } catch (error: any) {
        const message = error?.message ?? 'Unknown error';
        return new Response(`Error: ${message}`, { status: 500 });
    }
}