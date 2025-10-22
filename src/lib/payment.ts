// Simulação da integração com OpenPix para pagamento PIX
// Em produção, isso seria conectado com a API real da OpenPix

export interface PaymentData {
  userId: string
  amount: number
  description: string
}

export interface PixResponse {
  qrCode: string
  pixKey: string
  transactionId: string
  status: 'pending' | 'paid' | 'expired'
}

// Simular geração de QR Code PIX
export const generatePixPayment = async (data: PaymentData): Promise<PixResponse> => {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    qrCode: `00020126580014BR.GOV.BCB.PIX0136${data.userId}520400005303986540${data.amount.toFixed(2)}5802BR5925QI Test Pro6009SAO PAULO62070503***6304`,
    pixKey: `pix-${data.userId}@qitest.com`,
    transactionId: `tx_${Date.now()}_${data.userId}`,
    status: 'pending'
  }
}

// Simular webhook de confirmação de pagamento
export const simulatePaymentWebhook = (transactionId: string) => {
  return new Promise<{ status: 'paid' }>((resolve) => {
    // Simular confirmação após 3 segundos
    setTimeout(() => {
      resolve({ status: 'paid' })
    }, 3000)
  })
}

// Verificar status do pagamento
export const checkPaymentStatus = async (transactionId: string): Promise<'pending' | 'paid' | 'expired'> => {
  // Simular verificação
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Para demonstração, retorna 'paid' após alguns segundos
  const elapsed = Date.now() - parseInt(transactionId.split('_')[1])
  if (elapsed > 5000) return 'paid'
  
  return 'pending'
}