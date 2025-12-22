import { ReactNode } from "react";

interface Props {
  label: string;
  icon: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

interface IsLoadingProps {
  loading: boolean;
  children: ReactNode;
}

const Skeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-1">
      <div className="h-4 w-20 rounded bg-slate-700"></div>
      <div className="h-3 w-16 rounded bg-slate-700"></div>
    </div>
  );
};

const IsLoading = (loadingProps: IsLoadingProps) => {
  if (loadingProps.loading) return <Skeleton />;
  return loadingProps.children;
};

const TickerCard = (props: Props) => {
  return (
    <article className="bg-brand-900 flex w-full flex-col justify-center gap-1 p-4 transition-colors hover:bg-slate-800/80 md:justify-start">
      <header className="mb-1 flex min-w-max items-center gap-1 text-[10px] font-bold text-slate-500 uppercase">
        {props.icon}
        <span>{props.label}</span>
      </header>
      <div className="flex min-h-10 flex-col justify-center gap-0.5">
        <IsLoading loading={props.loading}>{props.children}</IsLoading>
      </div>
    </article>
  );
};

export default TickerCard;
