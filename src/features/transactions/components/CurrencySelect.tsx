import FormField from "@core/form/FormField";
import Select from "@core/form/Select";

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "USDT", label: "USDT" },
  { value: "BTC", label: "BTC" },
  { value: "EUR", label: "Euro" },
];

const CurrencySelect = () => {
  return (
    <FormField label="Divisa">
      <Select options={CURRENCY_OPTIONS} />
    </FormField>
  );
};

export default CurrencySelect;
