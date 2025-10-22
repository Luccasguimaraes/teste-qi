// Simulação do banco de dados para armazenar resultados dos testes
// Em produção, isso seria conectado com MongoDB Atlas

export interface User {
  id: string
  createdAt: Date
  email?: string
}

export interface TestResult {
  id: string
  userId: string
  score: number
  answers: number[]
  completedAt: Date
  timeSpent: number
  category: string
}

export interface Payment {
  id: string
  userId: string
  transactionId: string
  amount: number
  status: 'pending' | 'paid' | 'expired'
  createdAt: Date
  paidAt?: Date
}

// Simulação de armazenamento local (em produção seria MongoDB)
const storage = {
  users: new Map<string, User>(),
  tests: new Map<string, TestResult>(),
  payments: new Map<string, Payment>()
}

// Funções para gerenciar usuários
export const createUser = (userId: string): User => {
  const user: User = {
    id: userId,
    createdAt: new Date()
  }
  storage.users.set(userId, user)
  return user
}

export const getUser = (userId: string): User | null => {
  return storage.users.get(userId) || null
}

// Funções para gerenciar resultados de testes
export const saveTestResult = (result: Omit<TestResult, 'id'>): TestResult => {
  const testResult: TestResult = {
    ...result,
    id: `test_${Date.now()}_${result.userId}`
  }
  storage.tests.set(testResult.id, testResult)
  return testResult
}

export const getTestResult = (userId: string): TestResult | null => {
  for (const [, test] of storage.tests) {
    if (test.userId === userId) {
      return test
    }
  }
  return null
}

// Funções para gerenciar pagamentos
export const createPayment = (payment: Omit<Payment, 'id'>): Payment => {
  const paymentRecord: Payment = {
    ...payment,
    id: `pay_${Date.now()}_${payment.userId}`
  }
  storage.payments.set(paymentRecord.id, paymentRecord)
  return paymentRecord
}

export const updatePaymentStatus = (transactionId: string, status: Payment['status']): Payment | null => {
  for (const [id, payment] of storage.payments) {
    if (payment.transactionId === transactionId) {
      payment.status = status
      if (status === 'paid') {
        payment.paidAt = new Date()
      }
      storage.payments.set(id, payment)
      return payment
    }
  }
  return null
}

export const getPaymentByUser = (userId: string): Payment | null => {
  for (const [, payment] of storage.payments) {
    if (payment.userId === userId) {
      return payment
    }
  }
  return null
}

// Verificar se usuário tem acesso ao resultado (pagamento aprovado)
export const hasAccessToResult = (userId: string): boolean => {
  const payment = getPaymentByUser(userId)
  return payment?.status === 'paid' || false
}

// Estatísticas gerais (para dashboard futuro)
export const getStats = () => {
  const totalUsers = storage.users.size
  const totalTests = storage.tests.size
  const totalPayments = Array.from(storage.payments.values()).filter(p => p.status === 'paid').length
  
  const scores = Array.from(storage.tests.values()).map(t => t.score)
  const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  
  return {
    totalUsers,
    totalTests,
    totalPayments,
    averageScore: Math.round(averageScore)
  }
}