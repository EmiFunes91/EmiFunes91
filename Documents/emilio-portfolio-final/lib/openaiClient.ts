export async function getChatResponse(message: string) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });
  
    if (!res.ok) {
      throw new Error("Error al obtener respuesta de OpenAI");
    }
  
    const data = await res.json();
    return data.choices[0].message.content;
  }
  