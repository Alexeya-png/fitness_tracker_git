import { OpenAI } from "openai"
import { NextResponse } from "next/server"

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    if (!description) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 })
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Подсчитай калории и БЖУ для ${description}` }],
      max_tokens: 100,
    })

    const result = response.choices[0].message.content

    return NextResponse.json({ result })
  } catch (error) {
    const { description } = await request.json()
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      {
        result: `Анализ для ${description}:\nКалории: 350 ккал\nБелки: 25г\nЖиры: 12г\nУглеводы: 35г\n(Тестовые данные)`,
      },
      { status: 200 },
    )
  }
}
