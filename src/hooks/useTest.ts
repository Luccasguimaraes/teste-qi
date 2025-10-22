'use client'

import { useState, useEffect, useCallback } from 'react'
import { saveTestResult, createUser, createPayment } from '@/lib/database'
import { generatePixPayment } from '@/lib/payment'
import { TEST_CONFIG, PAYMENT_CONFIG } from '@/lib/constants'

export type TestScreen = 'landing' | 'test' | 'payment' | 'results'

export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
}

export interface UseTestReturn {
  // Estado atual
  currentScreen: TestScreen
  currentQuestion: number
  answers: number[]
  timeLeft: number
  testQuestions: Question[]
  userId: string
  paymentStatus: 'pending' | 'paid'
  finalScore: number
  
  // Ações
  startTest: () => void
  selectAnswer: (answerIndex: number) => void
  finishTest: () => void
  simulatePayment: () => void
  shareResult: (platform: string) => void
  resetTest: () => void
  
  // Utilitários
  formatTime: (seconds: number) => string
  getScoreCategory: (score: number) => {
    category: string
    color: string
    percentage: number
  }
}

export const useTest = (questions: Question[]): UseTestReturn => {
  const [currentScreen, setCurrentScreen] = useState<TestScreen>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(TEST_CONFIG.timeLimit)
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9))
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>('pending')
  const [finalScore, setFinalScore] = useState(0)

  // Embaralhar perguntas ao iniciar teste
  useEffect(() => {
    if (currentScreen === 'test' && testQuestions.length === 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, TEST_CONFIG.totalQuestions)
      setTestQuestions(shuffled)
    }
  }, [currentScreen, testQuestions.length, questions])

  // Timer do teste
  useEffect(() => {
    if (currentScreen === 'test' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentScreen === 'test') {
      finishTest()
    }
  }, [currentScreen, timeLeft])

  const startTest = useCallback(() => {
    setCurrentScreen('test')
    setCurrentQuestion(0)
    setAnswers([])
    setTimeLeft(TEST_CONFIG.timeLimit)
    
    // Criar usuário no sistema
    createUser(userId)
  }, [userId])

  const selectAnswer = useCallback((answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishTest()
    }
  }, [answers, currentQuestion, testQuestions.length])

  const finishTest = useCallback(() => {
    // Calcular pontuação baseada nas respostas corretas
    let correctAnswers = 0
    answers.forEach((answer, index) => {
      if (testQuestions[index] && answer === testQuestions[index].correct) {
        correctAnswers++
      }
    })
    
    // Simular pontuação de QI (70-140)
    const baseScore = 85 + (correctAnswers * 2.75)
    const score = Math.round(baseScore)
    setFinalScore(score)
    
    // Salvar resultado no sistema
    const timeSpent = TEST_CONFIG.timeLimit - timeLeft
    saveTestResult({
      userId,
      score,
      answers,
      completedAt: new Date(),
      timeSpent,
      category: getScoreCategory(score).category
    })
    
    // Criar registro de pagamento
    createPayment({
      userId,
      transactionId: `tx_${Date.now()}_${userId}`,
      amount: PAYMENT_CONFIG.price,
      status: 'pending',
      createdAt: new Date()
    })
    
    setCurrentScreen('payment')
  }, [answers, testQuestions, timeLeft, userId])

  const simulatePayment = useCallback(async () => {
    try {
      // Simular geração do PIX
      await generatePixPayment({
        userId,
        amount: PAYMENT_CONFIG.price,
        description: PAYMENT_CONFIG.description
      })
      
      // Simular pagamento aprovado após 3 segundos
      setTimeout(() => {
        setPaymentStatus('paid')
        setCurrentScreen('results')
      }, 3000)
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
    }
  }, [userId])

  const shareResult = useCallback((platform: string) => {
    const text = `Acabei de fazer um teste de QI e minha pontuação foi ${finalScore}! 🧠✨`
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(text)
      alert('Texto copiado! Cole no seu Instagram.')
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`)
    }
  }, [finalScore])

  const resetTest = useCallback(() => {
    setCurrentScreen('landing')
    setCurrentQuestion(0)
    setAnswers([])
    setTestQuestions([])
    setPaymentStatus('pending')
    setTimeLeft(TEST_CONFIG.timeLimit)
  }, [])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  const getScoreCategory = useCallback((score: number) => {
    if (score >= 130) return { category: "Superdotado", color: "bg-purple-500", percentage: 2 }
    if (score >= 120) return { category: "Superior", color: "bg-blue-500", percentage: 9 }
    if (score >= 110) return { category: "Acima da Média", color: "bg-green-500", percentage: 23 }
    if (score >= 90) return { category: "Média", color: "bg-yellow-500", percentage: 50 }
    if (score >= 80) return { category: "Abaixo da Média", color: "bg-orange-500", percentage: 16 }
    return { category: "Baixo", color: "bg-red-500", percentage: 2 }
  }, [])

  return {
    // Estado atual
    currentScreen,
    currentQuestion,
    answers,
    timeLeft,
    testQuestions,
    userId,
    paymentStatus,
    finalScore,
    
    // Ações
    startTest,
    selectAnswer,
    finishTest,
    simulatePayment,
    shareResult,
    resetTest,
    
    // Utilitários
    formatTime,
    getScoreCategory
  }
}