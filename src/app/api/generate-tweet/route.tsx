import OpenAI from "openai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { system_prompt } from "@/lib/prompt";

const ai = new OpenAI({apiKey:process.env.OPEN_AI_API_KEY});

export async function POST(req:NextRequest){
    const { file_url }:{file_url:string} = await req.json()
    console.log(file_url)  

    console.log("started transcribing");
    const { text } = await ai.audio.transcriptions.create({
        file: fs.createReadStream(file_url),
        model: "gpt-4o-transcribe",
    });

    const tweets = await ai.responses.create({
        model:"gpt-40-mini",
        input:[
            {
                role:"system",
                content:system_prompt
            },
            {
                role:"user",
                content:`Here is the Videos transcriptio ${text}`
            }
        ]
    })

    return NextResponse.json(text)
}