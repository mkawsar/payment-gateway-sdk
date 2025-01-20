import Stripe from 'stripe';
import { PaymentGateway } from '../interfaces/payment-gateway.interface';

export class StripeService implements PaymentGateway {
    private stripe: Stripe;

    /**
     * Initializes Stripe service with the given secret key
     * @param secretKey Stripe secret key
    */
    constructor(private secretKey: string) {
        this.stripe = new Stripe(secretKey, {
            apiVersion: '2024-12-18.acacia',
        });
    }

    /**
     * Initializes Stripe service. At the moment, it only logs a message to the console,
     * but it can be extended to perform more initialization tasks in the future.
    */
    async initialize(): Promise<void> {
        console.log('Stripe initialized');
    }

    /**
     * Creates a new payment intent with the specified amount, currency, and optional metadata.
     * @param amount - The amount to be charged, in the smallest currency unit (e.g., cents for USD).
     * @param currency - The currency in which the payment is to be made (e.g., 'usd').
     * @param metadata - Optional additional data to be associated with the payment intent.
     * @returns A promise that resolves to the created payment intent object.
    */
    async createPayment(amount: number, currency: string, metadata?: any): Promise<any> {
        return await this.stripe.paymentIntents.create({
            amount,
            currency,
            metadata
        });
    }

    /**
     * Verifies a payment using the given payment ID.
     * @param paymentId - The payment ID to be verified.
     * @returns A promise that resolves to the retrieved payment intent object.
    */
    async verifyPayment(paymentId: string): Promise<any> {
        return await this.stripe.paymentIntents.retrieve(paymentId);
    }

    /**
     * Initiates a refund for a specified payment.
     * @param paymentId - The ID of the payment to be refunded.
     * @param amount - Optional amount to refund. If not specified, the full payment amount will be refunded.
     * @returns A promise that resolves to the created refund object.
    */
    async refundPayment(paymentId: string, amount?: number): Promise<any> {
        return await this.stripe.refunds.create({
            payment_intent: paymentId,
            amount,
        });
    }
}
