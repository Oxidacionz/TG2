import { Transaction, ChartDataPoint } from '../types';

export const MOCK_DATA = {
  transactions: [
    { id: '#t1', date: '28/11/2025', ref: '# 102030', client: 'Juan Perez', clientBank: 'Chase', amount: 100, currency: 'USD', type: 'ENTRADA', operator: 'Camello_1', rate: 1.0, profit: 5, status: 'Completado' },
    { id: '#t2', date: '28/11/2025', ref: '# 102031', client: 'Maria Gomez', clientBank: 'Bofa', amount: 50, currency: 'USD', type: 'SALIDA', operator: 'Camello_2', rate: 1.0, profit: 2, status: 'Pendiente' },
    { id: '#t3', date: '27/11/2025', ref: '# 102029', client: 'Carlos Ruiz', clientBank: 'Zelle', amount: 200, currency: 'USD', type: 'ENTRADA', operator: 'Camello_1', rate: 1.0, profit: 10, status: 'Cancelado' },
  ] as Transaction[],
  chartData: [
    { name: '08:00', volume: 400, profit: 20 },
    { name: '10:00', volume: 300, profit: 15 },
    { name: '12:00', volume: 600, profit: 30 },
    { name: '14:00', volume: 500, profit: 25 },
    { name: '16:00', volume: 700, profit: 35 },
    { name: '18:00', volume: 450, profit: 22 },
  ] as ChartDataPoint[]
};
