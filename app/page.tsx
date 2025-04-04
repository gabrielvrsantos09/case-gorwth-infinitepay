"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [generatedTitle, setGeneratedTitle] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(false)
    setGeneratedTitle('')
    setGeneratedDescription('')
  
    try {
      const res = await fetch('/api/gerar-copy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: product,
          descricao: description,
        }),
      })
  
      const data = await res.json()
  
      if (data.resultado) {
        // Separar título e descrição
        const [titulo, descricaoFinal] = data.resultado.split('Descrição:')
        const tituloFinal = titulo.replace('Título:', '').trim()
        const descricaoLimpa = descricaoFinal?.trim() || ''
  
        setGeneratedTitle(tituloFinal)
        setGeneratedDescription(descricaoLimpa)
        setShowResults(true)
      } else {
        setGeneratedTitle('Erro ao gerar título')
        setGeneratedDescription('Tente novamente em instantes.')
      }
    } catch (error) {
      setGeneratedTitle('Erro ao conectar com a IA')
      setGeneratedDescription('Verifique sua conexão e tente novamente.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-white">
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl">
              Vamos criar uma oferta do seu produto e {" "}
              <span className="text-[#fac565]">vender mais</span>
            </h1>
            <p className="text-xl text-gray-300">
              Amplie os horizontes das suas venda com a inteligência do ecommerce{" "}
              <span className="font-semibold text-[#baff1b]">InfinitePay</span>
            </p>
          </div>

          {!showResults ? (
            /* Form */
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="product" className="block text-sm font-medium">
                    Qual produto você vende?
                  </label>
                  <Input
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Ex: Smartwatch, Tênis esportivo, Cadeira gamer..."
                    required
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Descreva o seu produto do seu jeito
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte um pouco sobre seu produto, características, diferenciais..."
                    rows={5}
                    required
                    className="border-gray-700 bg-gray-800 text-white"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#baff1b] text-black hover:bg-[#a8e619] transition-colors">
                  <Send className="mr-2 h-4 w-4" /> Gerar oferta para o meu produto
                </Button>
              </form>
            </div>
          ) : (
            /* Results */
            <div className="space-y-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6 shadow-lg">
              <div>
                <h2 className="mb-1 text-lg font-medium text-[#fac565]">Título persuasivo atualizado</h2>
                <div className="rounded-md bg-gray-800 p-4">
                  <p className="text-xl font-semibold">{generatedTitle}</p>
                </div>
              </div>

              <div>
                <h2 className="mb-1 text-lg font-medium text-[#fac565]">Descrição otimizada</h2>
                <div className="rounded-md bg-gray-800 p-4">
                  <p className="text-gray-300">{generatedDescription}</p>
                </div>
              </div>

              <a
                href="https://www.infinitepay.io/loja-online"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-[#baff1b] text-black hover:bg-[#a8e619] transition-colors">
                  QUERO EXPANDIR AS MINHAS VENDAS COM A INFINITEPAY
                </Button>
              </a>

              <Button
                variant="outline"
                onClick={() => setShowResults(false)}
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Voltar e editar
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Essa ferramenta é independente e foi criada para testar habilidades técnicas com IA.
          </p>
        </div>
      </footer>
    </div>
  )
}

