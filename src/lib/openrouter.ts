const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

interface ChatMessage {
    role: "user" | "assistant" | "system"
    content: string
}

interface ChatCompletionOptions {
    model?: string
    messages: ChatMessage[]
    temperature?: number
    max_tokens?: number
}

interface EmbeddingOptions {
    model?: string
    input: string
}

export async function openrouterChatCompletion(options: ChatCompletionOptions): Promise<string> {
    const {
        model = "google/gemini-2.5-flash-lite",
        messages,
        temperature = 0.7,
    } = options

    try {
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
            })
        })

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error("Error calling OpenRouter chat completion:", error)
        throw error
    }
}


export async function openrouterSingleMessage(prompt: string, model?: string): Promise<string> {
    return openrouterChatCompletion({
        model,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    })
}
