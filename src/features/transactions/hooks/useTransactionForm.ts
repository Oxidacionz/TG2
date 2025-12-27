import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { TransactionType as TransactionTypeEnum } from "@/types/enums";
import {
  calculateProfit as calcProfitUtils,
  calculateVES,
} from "@/utils/currency";

import { PROFIT_PERCENTAGES } from "../config/constants";
import { transactionService } from "../services/transaction.service";
import { CreateTransactionDTO, TransactionType } from "../types";

export interface TransactionFormState {
  type: TransactionType;
  // Client Data
  contact_id: string;
  new_contact_tax_id: string;
  new_contact_name: string; // Compliance: Integrity
  // Accounting
  amount_native: string;
  currency: "VES" | "USD";
  account_id: string;
  rate_internal: string;
  // Validation & Service
  reference: string;
  bank_commission_native: string; // Compliance: Semantics (Expense)
  service_fee_percent: number | "custom";
  custom_service_fee: string; // Profit
  // Support
  internal_notes: string;
}

interface UseTransactionFormProps {
  onSuccess: () => void;
  userEmail?: string;
}

export const useTransactionForm = ({
  onSuccess,
  userEmail,
}: UseTransactionFormProps) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const methods = useForm<TransactionFormState>({
    defaultValues: {
      type: TransactionTypeEnum.INCOME,
      // Client
      contact_id: "",
      new_contact_tax_id: "",
      new_contact_name: "",
      // Accounting
      amount_native: "",
      currency: "USD",
      account_id: "",
      rate_internal: "36.00",
      // Service
      service_fee_percent: PROFIT_PERCENTAGES[2],
      custom_service_fee: "",
      // Bank
      bank_commission_native: "0.00",
      reference: "",
      internal_notes: "",
    },
  });

  const { watch, handleSubmit } = methods;

  const [
    amount_native,
    rate_internal,
    service_fee_percent,
    custom_service_fee,
    type,
    currency,
  ] = watch([
    "amount_native",
    "rate_internal",
    "service_fee_percent",
    "custom_service_fee",
    "type",
    "currency",
  ]);

  const amountNum = parseFloat(amount_native) || 0;
  const rateNum = parseFloat(rate_internal) || 0;

  // Compliance: Clarity - Calculate USD amount explicitly
  const amountUSD =
    currency === "VES" && rateNum > 0 ? amountNum / rateNum : amountNum;
  const totalVES = calculateVES(amountNum, rateNum);

  const calculatedProfit =
    service_fee_percent === "custom"
      ? parseFloat(custom_service_fee) || 0
      : calcProfitUtils(amountUSD, Number(service_fee_percent)); // Profit based on USD amount usually

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: TransactionFormState) => {
    console.log("TransactionForm Data:", data);
    setLoading(true);
    try {
      // Map to DTO strictly
      const payload: CreateTransactionDTO = {
        type: data.type,

        // Account Details
        amount_native: data.amount_native,
        amount_usd: amountUSD, // Added derived value
        rate_internal: data.rate_internal,
        currency: data.currency,

        // Relations
        contact_id: data.contact_id || undefined,
        new_contact_tax_id: data.new_contact_tax_id || undefined,
        new_contact_name: data.new_contact_name || undefined,
        account_id: data.account_id,

        // Financials
        profit: calculatedProfit,
        bank_commission_native: data.bank_commission_native,
        service_fee_percent: data.service_fee_percent,

        // Meta
        reference: data.reference,
        internal_notes: data.internal_notes,
        user: userEmail,
      };

      await transactionService.createTransaction(payload);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error creating transaction:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      alert("Error al guardar: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    calculations: {
      totalVES,
      calculatedProfit,
      amountUSD, // Exposed for UI
    },
    ui: {
      loading,
      previewImage,
      fileInputRef,
    },
    actions: {
      handleFileChange,
      triggerFileInput,
      submit: handleSubmit(onSubmit),
    },
    values: {
      type,
      amount_native,
      rate_internal,
      currency,
      service_fee_percent,
      custom_service_fee,
    },
  };
};
