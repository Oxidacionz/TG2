import { Account } from "@domain";
import { AccountCard } from "./AccountCard";

interface Props {
  accounts: Account[];
  loading?: boolean;
}

export const AccountsList = (props: Props) => {
  const { accounts, loading = false } = props;

  if (loading) return <p className="text-slate-500">Cargando cuentas...</p>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((acc) => (
        <AccountCard key={acc.id} account={acc} />
      ))}
      {accounts.length === 0 && (
        <p className="col-span-3 text-center text-slate-500">
          No hay cuentas registradas.
        </p>
      )}
    </div>
  );
};
