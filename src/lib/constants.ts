// Configurações e constantes do sistema

export const APP_CONFIG = {
  name: 'QI Test Pro',
  description: 'Descubra seu QI com o teste mais preciso da internet',
  version: '1.0.0',
  author: 'QI Test Pro Team'
}

export const TEST_CONFIG = {
  totalQuestions: 20,
  timeLimit: 1200, // 20 minutos em segundos
  passingScore: 100,
  maxScore: 200,
  minScore: 50
}

export const PAYMENT_CONFIG = {
  price: 6.99,
  currency: 'BRL',
  description: 'Acesso ao Relatório Completo de QI'
}

export const SCORE_CATEGORIES = [
  { min: 130, max: 200, label: 'Superdotado', color: 'bg-purple-500', percentage: 2 },
  { min: 120, max: 129, label: 'Superior', color: 'bg-blue-500', percentage: 9 },
  { min: 110, max: 119, label: 'Acima da Média', color: 'bg-green-500', percentage: 23 },
  { min: 90, max: 109, label: 'Média', color: 'bg-yellow-500', percentage: 50 },
  { min: 80, max: 89, label: 'Abaixo da Média', color: 'bg-orange-500', percentage: 16 },
  { min: 50, max: 79, label: 'Baixo', color: 'bg-red-500', percentage: 2 }
]

export const SOCIAL_SHARE = {
  whatsapp: {
    baseUrl: 'https://wa.me/',
    template: 'Acabei de fazer um teste de QI e minha pontuação foi {score}! 🧠✨ Faça o seu também: {url}'
  },
  instagram: {
    template: 'Acabei de fazer um teste de QI e minha pontuação foi {score}! 🧠✨ #QITest #Inteligencia'
  },
  facebook: {
    baseUrl: 'https://www.facebook.com/sharer/sharer.php',
    template: 'Acabei de fazer um teste de QI e minha pontuação foi {score}! 🧠✨'
  }
}

export const SEO_CONFIG = {
  title: 'Teste de QI Online Grátis - Descubra Sua Inteligência',
  description: 'Faça o teste de QI mais preciso da internet. Mais de 100.000 pessoas já descobriram seu potencial intelectual. Resultado imediato!',
  keywords: 'teste de qi, teste inteligencia, qi online, teste psicologico, quociente inteligencia',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
}

export const ANALYTICS_CONFIG = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
  hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || ''
}

// Mensagens do sistema
export const MESSAGES = {
  testCompleted: 'Parabéns! Você completou o teste de QI.',
  paymentRequired: 'Para acessar seu resultado completo, realize o pagamento de R$ 6,99 via PIX.',
  paymentSuccess: 'Pagamento aprovado! Você já pode acessar seu resultado.',
  paymentPending: 'Aguardando confirmação do pagamento...',
  shareText: 'Acabei de fazer um teste de QI e minha pontuação foi {score}! 🧠✨',
  disclaimer: 'Este teste tem caráter recreativo e não substitui avaliação psicológica profissional.'
}

// URLs e endpoints (para produção)
export const API_ENDPOINTS = {
  generatePix: '/api/payment/generate-pix',
  webhookPix: '/api/payment/webhook',
  getResult: '/api/result',
  saveTest: '/api/test/save',
  getStats: '/api/stats'
}

export const EXTERNAL_APIS = {
  openpix: {
    baseUrl: process.env.OPENPIX_API_URL || 'https://api.openpix.com.br/api/v1',
    appId: process.env.OPENPIX_APP_ID || '',
    webhook: process.env.OPENPIX_WEBHOOK_SECRET || ''
  },
  mongodb: {
    uri: process.env.MONGODB_URI || '',
    dbName: process.env.MONGODB_DB_NAME || 'qitest'
  }
}