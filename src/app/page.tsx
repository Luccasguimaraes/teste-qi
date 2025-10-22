'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, Clock, Users, Star, Share2, Trophy, CheckCircle } from 'lucide-react'
import { useTest } from '@/hooks/useTest'
import { SCORE_CATEGORIES } from '@/lib/constants'

// Banco de perguntas do teste de QI
const questions = [
  {
    id: 1,
    question: "Se todos os A são B, e todos os B são C, então:",
    options: ["Todos os A são C", "Alguns A são C", "Nenhum A é C", "Não é possível determinar"],
    correct: 0,
    category: "lógica"
  },
  {
    id: 2,
    question: "Qual número completa a sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1,
    category: "matemática"
  },
  {
    id: 3,
    question: "LIVRO está para LEITURA assim como PIANO está para:",
    options: ["Música", "Teclas", "Som", "Instrumento"],
    correct: 0,
    category: "analogia"
  },
  {
    id: 4,
    question: "Em uma sala há 4 gatos. Cada gato vê 3 gatos. Quantos gatos há na sala?",
    options: ["3", "4", "7", "12"],
    correct: 1,
    category: "lógica"
  },
  {
    id: 5,
    question: "Qual palavra não pertence ao grupo?",
    options: ["Vermelho", "Azul", "Verde", "Quadrado"],
    correct: 3,
    category: "classificação"
  },
  {
    id: 6,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas fazem 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correct: 0,
    category: "matemática"
  },
  {
    id: 7,
    question: "Qual é o antônimo de EFÊMERO?",
    options: ["Temporário", "Duradouro", "Rápido", "Passageiro"],
    correct: 1,
    category: "vocabulário"
  },
  {
    id: 8,
    question: "Complete o padrão: △ ○ □ △ ○ ?",
    options: ["△", "○", "□", "◇"],
    correct: 2,
    category: "padrões"
  },
  {
    id: 9,
    question: "Um trem de 100m atravessa uma ponte de 200m em 15 segundos. Qual sua velocidade?",
    options: ["20 m/s", "72 km/h", "Ambas estão corretas", "Nenhuma está correta"],
    correct: 2,
    category: "matemática"
  },
  {
    id: 10,
    question: "Qual número é diferente dos outros?",
    options: ["14", "21", "35", "38"],
    correct: 3,
    category: "matemática"
  },
  {
    id: 11,
    question: "MÉDICO está para HOSPITAL assim como PROFESSOR está para:",
    options: ["Aluno", "Escola", "Ensino", "Conhecimento"],
    correct: 1,
    category: "analogia"
  },
  {
    id: 12,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correct: 0,
    category: "lógica"
  },
  {
    id: 13,
    question: "Qual é o próximo número: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "16"],
    correct: 1,
    category: "matemática"
  },
  {
    id: 14,
    question: "Quantos triângulos você consegue ver na figura? (Imagine um triângulo grande dividido em 4 triângulos menores)",
    options: ["4", "5", "8", "13"],
    correct: 2,
    category: "visual"
  },
  {
    id: 15,
    question: "Qual palavra pode ser formada com as letras: AMORC?",
    options: ["MARCO", "CROMA", "AMOR", "Todas as anteriores"],
    correct: 3,
    category: "vocabulário"
  },
  {
    id: 16,
    question: "Se A=1, B=2, C=3... qual é o valor de CASA?",
    options: ["20", "22", "24", "26"],
    correct: 0,
    category: "matemática"
  },
  {
    id: 17,
    question: "Complete: Água está para sede assim como comida está para:",
    options: ["Fome", "Sabor", "Nutrição", "Digestão"],
    correct: 0,
    category: "analogia"
  },
  {
    id: 18,
    question: "Qual é o menor número que é divisível por 2, 3, 4, 5 e 6?",
    options: ["30", "60", "120", "180"],
    correct: 1,
    category: "matemática"
  },
  {
    id: 19,
    question: "Em um código, GATO = 1234. Qual seria TOGA?",
    options: ["4321", "4231", "3241", "2341"],
    correct: 1,
    category: "lógica"
  },
  {
    id: 20,
    question: "Qual é a próxima letra na sequência: A, D, G, J, ?",
    options: ["K", "L", "M", "N"],
    correct: 2,
    category: "padrões"
  }
]

const testimonials = [
  { name: "Maria S.", score: "132", text: "Resultado surpreendente! Muito preciso." },
  { name: "João P.", score: "128", text: "Teste bem elaborado, recomendo!" },
  { name: "Ana L.", score: "135", text: "Descobri potenciais que não conhecia." }
]

export default function IQTest() {
  const {
    currentScreen,
    currentQuestion,
    testQuestions,
    timeLeft,
    paymentStatus,
    finalScore,
    startTest,
    selectAnswer,
    simulatePayment,
    shareResult,
    resetTest,
    formatTime,
    getScoreCategory
  } = useTest(questions)

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">QI Test Pro</h1>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Descubra seu QI com o teste mais preciso da internet
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Mais de 100.000 pessoas já descobriram seu potencial intelectual
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                20 minutos
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-4 py-2">
                <Brain className="w-4 h-4 mr-2" />
                20 questões
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                Resultado imediato
              </Badge>
            </div>

            <Button 
              onClick={startTest}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-xl rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Começar Agora - Grátis
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Cientificamente Validado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Baseado em métodos reconhecidos internacionalmente</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Comparação Global</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Veja como você se compara com a população mundial</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardHeader>
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <CardTitle className="text-white">Resultado Detalhado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Relatório completo com análise personalizada</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">O que dizem nossos usuários</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-blue-400 font-bold">QI {testimonial.score}</span>
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="text-sm text-gray-400">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-slate-700">
          <p className="text-sm">
            ⚠️ Este teste tem caráter recreativo e não substitui avaliação psicológica profissional.
          </p>
        </footer>
      </div>
    )
  }

  // Test Screen
  if (currentScreen === 'test') {
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="font-bold">QI Test Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Questão {currentQuestion + 1} de {testQuestions.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          {testQuestions[currentQuestion] && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  {testQuestions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start p-4 h-auto bg-slate-800 border-slate-600 hover:border-blue-400 hover:bg-blue-600/20 text-white"
                      onClick={() => selectAnswer(index)}
                    >
                      <span className="mr-3 w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-sm text-white">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Payment Screen
  if (currentScreen === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Teste Concluído!</h1>
            <p className="text-gray-300">Seu resultado está pronto</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Acesse seu Relatório Completo</CardTitle>
              <p className="text-gray-300">
                Para visualizar sua pontuação detalhada e comparação populacional
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-3xl font-bold text-green-400 mb-2">R$ 6,99</div>
                <p className="text-sm text-gray-400">Pagamento único via PIX</p>
              </div>

              {paymentStatus === 'pending' ? (
                <div>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="text-6xl mb-2">📱</div>
                        <div className="text-sm">QR Code PIX</div>
                        <div className="text-xs mt-2 font-mono">
                          PIX: qitest@exemplo.com
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={simulatePayment}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Simular Pagamento Aprovado
                  </Button>
                  
                  <p className="text-xs text-gray-400 mt-4">
                    Após o pagamento, você receberá acesso imediato ao resultado
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <p className="text-green-400 font-bold">Pagamento Aprovado!</p>
                  <p className="text-sm text-gray-300">Redirecionando...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Results Screen
  if (currentScreen === 'results') {
    const scoreData = getScoreCategory(finalScore)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Seu Resultado</h1>
            <p className="text-gray-300">Análise completa do seu desempenho</p>
          </div>

          {/* Score Display */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardContent className="text-center p-8">
              <div className="text-6xl font-bold text-blue-400 mb-4">{finalScore}</div>
              <div className="text-xl font-semibold mb-2">Seu QI</div>
              <Badge className={`${scoreData.color} text-white px-4 py-2`}>
                {scoreData.category}
              </Badge>
              <p className="text-sm text-gray-400 mt-4">
                Você está no top {100 - scoreData.percentage}% da população
              </p>
            </CardContent>
          </Card>

          {/* Population Comparison */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Comparação Populacional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SCORE_CATEGORIES.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-gray-300">{item.min}+</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-6 relative">
                          <div 
                            className={`${item.color} h-full rounded-full flex items-center justify-end pr-2`}
                            style={{ width: `${item.percentage}%` }}
                          >
                            {finalScore >= item.min && finalScore <= item.max && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="w-12 text-sm text-gray-300">{item.percentage}%</div>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Share Buttons */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Compartilhe seu Resultado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button 
                  onClick={() => shareResult('whatsapp')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button 
                  onClick={() => shareResult('instagram')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* New Test Button */}
          <div className="text-center">
            <Button 
              onClick={resetTest}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              Fazer Novo Teste
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}