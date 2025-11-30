import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { supabase } from "../lib/supabaseClient";
import { ICONS } from "../components/atoms/Icons";
import { Card } from "../components/atoms/Card";
import { StatCard } from "../components/molecules/StatCard";
import { MOCK_DATA } from "../mocks/mockData";
import { ExchangeRateService } from "../services/ExchangeRateService";
import { Modal } from "../components/organisms/Modal";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";

export const DashboardView = ({
  refreshTrigger,
}: {
  refreshTrigger?: number;
}) => {
  const [stats, setStats] = useState({
    totalVolume: 0,
    netProfit: 0,
    pendingCount: 0,
    totalCapital: 0,
  });

  // BCV State
  const [bcvRate, setBcvRate] = useState<{ usd: number; eur: number } | null>(
    null,
  );

  // Config State (Tasa Global)
  const [globalRate, setGlobalRate] = useState("36.00");
  const [isEditRateOpen, setIsEditRateOpen] = useState(false);
  const [tempRate, setTempRate] = useState("");

  // Clock State
  const [time, setTime] = useState(new Date());

  // Chart State
  const [chartType, setChartType] = useState<"line" | "pie">("line");
  const [lineData, setLineData] = useState(MOCK_DATA.chartData);
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    // Timer for clock
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const initData = async () => {
      // 1. Fetch BCV
      const rates = await ExchangeRateService.getBCVRate();
      if (rates) setBcvRate({ usd: rates.usd, eur: rates.eur });

      // 2. Fetch Global Rate from DB or LocalStorage
      try {
        const { data, error } = await supabase
          .from("app_config")
          .select("global_rate_ves")
          .single();
        if (data && data.global_rate_ves) {
          setGlobalRate(data.global_rate_ves.toFixed(2));
        } else {
          // Fallback to local storage
          const local = localStorage.getItem("globalRate");
          if (local) setGlobalRate(local);
        }
      } catch (e) {
        console.error("Config fetch error", e);
      }

      // 3. Stats
      fetchStats();
    };
    initData();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    const { data: txData } = await supabase
      .from("transactions")
      .select("amount, profit, status, type");
    const { data: accData } = await supabase
      .from("accounts")
      .select("balance, currency");

    let volume = 0;
    let profit = 0;
    let pending = 0;
    let capital = 0;
    let entradas = 0;
    let salidas = 0;

    if (txData) {
      txData.forEach((tx: any) => {
        if (tx.status === "Completado") {
          volume += Number(tx.amount);
          profit += Number(tx.profit);
          if (tx.type === "ENTRADA") entradas += Number(tx.amount);
          else salidas += Number(tx.amount);
        }
        if (tx.status === "Pendiente") pending++;
      });
    }

    if (accData) {
      accData.forEach((acc: any) => {
        if (acc.currency === "USD" || acc.currency === "USDT") {
          capital += Number(acc.balance);
        }
      });
    }

    setStats({
      totalVolume: volume,
      netProfit: profit,
      pendingCount: pending,
      totalCapital: capital,
    });

    setPieData([
      { name: "Entradas", value: entradas },
      { name: "Salidas", value: salidas },
    ]);
  };

  const handleUpdateRate = async () => {
    const newRate = parseFloat(tempRate).toFixed(2);
    setGlobalRate(newRate);
    localStorage.setItem("globalRate", newRate);

    // Try to update DB if table exists
    try {
      await supabase
        .from("app_config")
        .upsert({ id: 1, global_rate_ves: parseFloat(newRate) });
    } catch (error) {
      console.error("Error al realizar el upsert:", error);
    }

    // await supabase.from('app_config').upsert({ id: 1, global_rate_ves: parseFloat(newRate) }).catch(() => {});

    setIsEditRateOpen(false);
  };

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* --- TOP BANNER REDESIGN (MATCHING IMAGE) --- */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] shadow-2xl md:flex-row">
        {/* LEFT BLOCK: Tasa Promedio Global (Blue) */}
        <div className="group relative flex items-center justify-between bg-blue-600 p-4 md:w-64">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/20 p-2 text-white">
              <span className="text-xl font-bold">$</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold tracking-wider text-blue-100 uppercase">
                  Tasa Promedio Global
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{globalRate} VES</p>
            </div>
          </div>
          {/* Edit Button (Absolute) */}
          <button
            onClick={() => {
              setTempRate(globalRate);
              setIsEditRateOpen(true);
            }}
            className="absolute top-2 right-2 rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ICONS.Edit />
          </button>

          {/* Vertical Separator (Visual for desktop) */}
          <div className="absolute top-2 right-0 bottom-2 hidden w-px bg-blue-500/50 md:block"></div>
        </div>

        {/* CENTER BLOCK: Clock */}
        <div className="flex flex-1 items-center justify-center border-b border-slate-800 bg-[#0f172a] p-4 md:border-r md:border-b-0">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-slate-800 p-3 text-blue-500">
              <ICONS.Clock />
            </div>
            <div>
              <p className="font-mono text-2xl font-bold tracking-widest text-white">
                {time.toLocaleTimeString("en-US", { hour12: true })}
              </p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                {time.toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT BLOCK: Tickers Grid */}
        <div className="flex flex-[1.5] items-center justify-around bg-[#0f172a] p-4 text-white">
          {/* BCV */}
          <div className="border-r border-slate-800 px-4 text-right last:border-0">
            <div className="mb-1 flex items-center justify-end gap-1 text-[10px] font-bold text-slate-500 uppercase">
              <ICONS.Transactions /> BCV Oficial <ICONS.Refresh />
            </div>
            <div className="text-sm font-bold text-white">
              $ {bcvRate ? bcvRate.usd.toFixed(2) : "--"}
            </div>
            <div className="text-xs text-slate-400">
              € {bcvRate ? bcvRate.eur.toFixed(2) : "--"}
            </div>
          </div>

          {/* Binance */}
          <div className="border-r border-slate-800 px-4 text-right last:border-0">
            <div className="mb-1 flex items-center justify-end gap-1 text-[10px] font-bold text-slate-500 uppercase">
              <ICONS.Lightning /> Binance P2P <ICONS.Refresh />
            </div>
            <div className="text-sm font-bold text-yellow-500">BUY 36.10</div>
            <div className="text-xs font-medium text-orange-400">
              SELL 35.90
            </div>
          </div>

          {/* Zelle */}
          <div className="hidden border-r border-slate-800 px-4 text-right last:border-0 lg:block">
            <div className="mb-1 flex items-center justify-end gap-1 text-[10px] font-bold text-slate-500 uppercase">
              <ICONS.Globe /> Zelle <ICONS.Edit />
            </div>
            <div className="text-sm font-bold text-green-400">36.00</div>
          </div>

          {/* Euro */}
          <div className="px-4 text-right">
            <div className="mb-1 flex items-center justify-end gap-1 text-[10px] font-bold text-slate-500 uppercase">
              <ICONS.Globe /> Euro (Intl) <ICONS.Edit />
            </div>
            <div className="text-sm font-bold text-blue-400">€ 39.00</div>
          </div>
        </div>
      </div>
      {/* --- END BANNER --- */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Volumen Total"
          value={`$${stats.totalVolume.toLocaleString()}`}
          subtext="↗ General"
          icon={<ICONS.Transactions />}
          color="blue"
        />
        <StatCard
          title="Ganancia Neta"
          value={`$${stats.netProfit.toLocaleString()}`}
          subtext="Margen global"
          icon={<span className="text-xl font-bold">$</span>}
          color="green"
        />
        <StatCard
          title="Capital en Cuentas"
          value={`$${stats.totalCapital.toLocaleString()}`}
          subtext="Disponible Real"
          icon={<ICONS.Wallet />}
          color="yellow"
        />
      </div>

      <Card className="h-[400px] p-6">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {chartType === "line"
              ? "Tendencia de Volumen vs Ganancia"
              : "Distribución Entrada vs Salida"}
          </h3>
          <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
            <button
              onClick={() => setChartType("line")}
              className={`rounded p-2 shadow-sm transition-colors ${chartType === "line" ? "bg-white text-slate-800 dark:bg-slate-600 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              <ICONS.Dashboard />
            </button>
            <button
              onClick={() => setChartType("pie")}
              className={`rounded p-2 shadow-sm transition-colors ${chartType === "pie" ? "bg-white text-slate-800 dark:bg-slate-600 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              <ICONS.Reports />
            </button>
          </div>
        </div>

        <div className="h-full w-full pb-10">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      <Modal
        isOpen={isEditRateOpen}
        onClose={() => setIsEditRateOpen(false)}
        title="Editar Tasa Promedio Global"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Esta tasa se usará como referencia para cálculos rápidos en la
            aplicación.
          </p>
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Nueva Tasa (VES/$)
            </label>
            <Input
              type="number"
              value={tempRate}
              onChange={(e) => setTempRate(e.target.value)}
              placeholder="0.00"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsEditRateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateRate}>Guardar Nueva Tasa</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
