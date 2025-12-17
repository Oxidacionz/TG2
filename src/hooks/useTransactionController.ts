import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { exchangeRateService } from "../services/ExchangeRateService";
import { transactionService } from "../services/TransactionService";
import { TransactionType } from "../types";
import { TransactionType as TransactionTypeEnum } from "../types/enums";

export interface TransactionFormData {
  type: TransactionType;
  amount: string;
  rate: string;
  profitPercent: number | "custom"; // 5 | "custom"
  customProfit: string;
  clientName: string;
  clientBank: string;
  targetAccount: string;
  commission: string;
  reference: string;
  notes: string;
}

interface UseTransactionControllerProps {
  onSuccess: () => void;
  userEmail?: string;
}

export const useTransactionController = ({
  onSuccess,
  userEmail,
}: UseTransactionControllerProps) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const methods = useForm<TransactionFormData>({
    defaultValues: {
      type: TransactionTypeEnum.INCOME,
      amount: "",
      rate: "36.00",
      profitPercent: 5,
      customProfit: "",
      clientName: "",
      clientBank: "",
      targetAccount: "",
      commission: "",
      reference: "",
      notes: "",
    },
  });

  const { watch, handleSubmit } = methods;

  // Watch fields for calculations
  const [amount, rate, profitPercent, customProfit, type] = watch([
    "amount",
    "rate",
    "profitPercent",
    "customProfit",
    "type",
  ]);

  // Calculations
  const amountNum = parseFloat(amount) || 0;
  const rateNum = parseFloat(rate) || 0;
  const totalVES = exchangeRateService.calculateVES(amountNum, rateNum);

  const calculatedProfit =
    profitPercent === "custom"
      ? parseFloat(customProfit) || 0
      : exchangeRateService.calculateProfit(amountNum, Number(profitPercent));

  // File Handling
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

  const onSubmit = async (data: TransactionFormData) => {
    console.log("TransactionForm Data:", data);
    setLoading(true);
    try {
      await transactionService.createTransaction({
        type: data.type,
        amount: data.amount,
        rate: data.rate,
        profit: calculatedProfit,
        clientName: data.clientName,
        clientBank: data.clientBank,
        targetAccount: data.targetAccount,
        notes: data.notes,
        user: userEmail,
      });

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
    // Expose watched values for UI if needed directly, or just use watch in component
    values: {
      type,
      amount,
      rate,
      profitPercent,
      customProfit,
    },
  };
};
