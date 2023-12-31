import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log(openai, "openai")

export async function GET(request: Request) {
    return new Response('Hello openai here!', { status: 200 })
}

export async function POST(request: Request) {

    const {userText} = await request.json();
    console.log(userText, "userText")

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [ {role: "user", content: userText}],
      });


    const aiMessage = completion.data.choices[0].message?.content;

    return NextResponse.json({message: aiMessage}, {status: 200})

}