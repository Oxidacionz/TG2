import { useState, useRef } from "react";
import { exchangeRateService } from "../services/ExchangeRateService";
import { transactionService } from "../services/TransactionService";
import { TransactionType } from "../types";
import { TransactionType as TransactionTypeEnum } from "../types/enums"; // Import enum for value usage

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

  // Estados del formulario (Datos Principales)
  const [type, setType] = useState<TransactionType>(TransactionTypeEnum.INCOME);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("36.00");
  const [profitPercent, setProfitPercent] = useState<number | "custom">(5);
  const [customProfit, setCustomProfit] = useState("");

  // Datos Operativos
  const [formData, setFormData] = useState({
    clientName: "",
    clientBank: "",
    targetAccount: "",
    commission: "",
    reference: "",
    notes: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Setters helpers
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Cálculos automáticos via Service
  const amountNum = parseFloat(amount) || 0;
  const rateNum = parseFloat(rate) || 0;

  // Delegamos el cálculo de VES al servicio
  const totalVES = exchangeRateService.calculateVES(amountNum, rateNum);

  // Delegamos el cálculo de ganancia al servicio
  const calculatedProfit =
    profitPercent === "custom"
      ? parseFloat(customProfit) || 0
      : exchangeRateService.calculateProfit(amountNum, profitPercent);

  // Manejo de Archivos
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

  const handleSubmit = async () => {
    // Validaciones básicas
    if (!formData.clientName) {
      alert("Por favor ingrese el nombre del cliente.");
      return;
    }
    if (!amount || amountNum <= 0) {
      alert("Por favor ingrese un monto válido.");
      return;
    }
    if (!formData.targetAccount) {
      alert("Por favor seleccione la cuenta interna.");
      return;
    }

    setLoading(true);
    try {
      // Delegamos la persistencia al servicio
      await transactionService.createTransaction({
        type,
        amount,
        rate,
        profit: calculatedProfit,
        clientName: formData.clientName,
        clientBank: formData.clientBank,
        targetAccount: formData.targetAccount,
        notes: formData.notes,
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
    state: {
      type,
      amount,
      rate,
      profitPercent,
      customProfit,
      formData,
      previewImage,
      loading,
      calculations: {
        totalVES,
        calculatedProfit,
      },
      fileInputRef,
    },
    actions: {
      setType,
      setAmount,
      setRate,
      setProfitPercent,
      setCustomProfit,
      handleInputChange,
      handleFileChange,
      triggerFileInput,
      handleSubmit,
    },
  };
};
