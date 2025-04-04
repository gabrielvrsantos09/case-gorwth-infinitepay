import type { NextApiRequest, NextApiResponse } from 'next'
import { gerarCopy } from '@/lib/openai'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nome, descricao } = req.body

  if (!nome || !descricao) {
    return res.status(400).json({ erro: 'Campos obrigatórios' })
  }

  try {
    const resultado = await gerarCopy(nome, descricao)
  

    const [titulo, descricaoFinal] = resultado.split('Descrição:')
    const tituloFinal = titulo.replace('Título:', '').trim()
    const descricaoIA = descricaoFinal?.trim() || ''
  
  
    const { error } = await supabase.from('copy_logs').insert({
      nome_produto: nome,
      descricao_original: descricao,
      titulo_ia: tituloFinal,
      descricao_ia: descricaoIA
    })
    
    console.log('ERRO AO INSERIR:', error)
    
    res.status(200).json({ resultado })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao gerar copy' })
  }
}