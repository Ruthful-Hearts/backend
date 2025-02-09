import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const CHAPA_SECRET_KEY = process.env.CHAPPA_API_SECRET;
const CHAPA_BASE_URL = "https://api.chapa.co/v1/transaction/initialize";
const VERIFY_URL = "https://api.chapa.co/v1/transaction/verify/";


interface PaymentData {
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  txRef: string;
  returnUrl: string;
}

export const initializePayment = async ({
  amount,
  email,
  firstName,
  lastName,
  txRef,
  returnUrl
}: PaymentData) => {
  try {
    const response = await axios.post(
      CHAPA_BASE_URL,
      {
        amount,
        currency: "ETB",
        email: email.toLowerCase().trim(),
        first_name: firstName,
        last_name: lastName,
        tx_ref: txRef,
        return_url: returnUrl,
        callback_url: returnUrl
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      const errorMessage = JSON.stringify(error.response.data.message);
      throw new Error(errorMessage);
    }
    throw new Error(error.message);
  }
};

export const verifyPayment = async (txRef: string) => {
  try {
    const response = await axios.get(`${VERIFY_URL}${txRef}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Payment Verification Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Payment verification failed");
  }
}; 