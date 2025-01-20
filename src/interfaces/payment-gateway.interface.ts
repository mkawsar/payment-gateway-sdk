export interface PaymentGateway {
    initialize(): Promise<void>;
    createPayment(amount: number, currency: string, metadata?: any): Promise<any>;
    verifyPayment(paymentId: string): Promise<any>;
    refundPayment(paymentId: string): Promise<any>;
}
