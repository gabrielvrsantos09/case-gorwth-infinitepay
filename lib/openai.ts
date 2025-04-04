import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function gerarCopy(nome: string, descricao: string) {
  const prompt = `
Você é um especialista em copywriting para e-commerce.

Reescreva o nome e a descrição do produto abaixo de forma clara, atrativa, objetiva e persuasiva, otimizando para conversão em lojas online.

Produto: ${nome}
Descrição original: ${descricao}

Responda apenas com:

Título:
[novo título]

Descrição:
[nova descrição]
`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return response.choices[0].message.content
}