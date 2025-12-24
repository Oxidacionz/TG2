import { IoScan } from "react-icons/io5";

import { Button } from "@core/ui/Button";

interface Props {
  onScan?: () => void;
}

const TransactionsHeader = (props: Props) => {
  const { onScan } = props;

  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Transacciones
        </h2>
        <p className="text-sm text-slate-500">
          Historial de operaciones y estados
        </p>
      </div>
      <Button
        variant="primary"
        onClick={onScan}
        icon={<IoScan className="h-6 w-6" />}
      >
        Escanear / Nuevo
      </Button>
    </div>
  );
};

export default TransactionsHeader;
