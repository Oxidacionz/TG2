import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

import { useExchangeRates } from "@features/exchange-rates";

interface IsLoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

const Skeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-1">
      <div className="h-4 w-24 rounded bg-white/20"></div>
    </div>
  );
};

const IsLoading = ({ isLoading, children }: IsLoadingProps) => {
  if (isLoading) return <Skeleton />;
  return children;
};

export const GlobalRateCard = () => {
  const { ratesMap, isLoading, updateInternalRate } = useExchangeRates();

  const globalRate = ratesMap["Internal-VES"]?.value;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      updateGlobalRate: globalRate,
    },
  });

  const BUTTON_CLASSES =
    "px-2 py-1 transition-colors duration-100 hover:bg-white/10";

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleCancel = () => {
    reset({ updateGlobalRate: globalRate });
    setIsEdit(false);
  };

  const onSubmit = (data: { updateGlobalRate: number | undefined }) => {
    if (data.updateGlobalRate !== undefined) {
      updateInternalRate(data.updateGlobalRate);
    }
    setIsEdit(false);
  };

  return (
    <div
      className={`group relative flex flex-1 justify-center border-b border-slate-800 p-4 transition-colors duration-300 sm:border-b-0 ${isEdit ? "bg-brand-900" : "bg-blue-600"}`}
    >
      <div className="flex w-full flex-row justify-center gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              <FaHandHoldingDollar className="h-4 w-4 text-white" />
              <p className="text-[10px] font-bold text-white uppercase">
                Tasa Global
              </p>
            </span>
          </div>
          <div className="flex min-h-[32px] w-full flex-col justify-center">
            <div className="flex w-full flex-row text-2xl font-bold text-white">
              <IsLoading isLoading={isLoading}>
                {isEdit ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-end"
                  >
                    <div className="flex w-full flex-row items-center gap-4">
                      <input
                        {...register("updateGlobalRate", {
                          required: {
                            value: true,
                            message: "La tasa es requerida",
                          },
                          min: { value: 0, message: "Debe ser mayor a 0" },
                        })}
                        className="w-full flex-1 [appearance:textfield] rounded-lg bg-white/15 px-2 py-1 text-white outline-none focus:bg-white/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        min="0"
                        step="any"
                        placeholder={globalRate?.toString() || "0"}
                      />
                    </div>

                    <div className="flex h-full min-h-8 w-fit flex-row divide-x divide-white/20 rounded-lg bg-white/20 text-xs">
                      <button
                        type="submit"
                        className={`rounded-l-lg ${BUTTON_CLASSES}`}
                      >
                        guardar
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className={`rounded-r-lg ${BUTTON_CLASSES}`}
                      >
                        cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  globalRate
                )}
              </IsLoading>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleEdit}
        className={`${isEdit ? "hidden" : ""} absolute top-2 right-2 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white`}
      >
        <MdModeEdit className="h-4 w-4" />
      </button>
    </div>
  );
};
