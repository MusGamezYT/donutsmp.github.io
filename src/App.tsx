/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp,
  TrendingDown,
  Info
} from 'lucide-react';

type Mode = 'investment' | 'stack' | 'shulker';

export default function App() {
  // Price Inputs
  const [paperPrice, setPaperPrice] = useState<number>(10);
  const [leatherPrice, setLeatherPrice] = useState<number>(50);
  const [logPrice, setLogPrice] = useState<number>(20);
  const [ahPrice, setAhPrice] = useState<number>(250);

  // Mode and Value
  const [mode, setMode] = useState<Mode>('investment');
  const [inputValue, setInputValue] = useState<number>(1000);

  // Calculations
  const results = useMemo(() => {
    const rawCostPerBookshelf = (9 * paperPrice) + (3 * leatherPrice) + (1.5 * logPrice);
    
    let bookshelfCount = 0;
    if (mode === 'investment') {
      bookshelfCount = Math.floor(inputValue / rawCostPerBookshelf);
      
      // Adjust for whole log purchase constraint
      let actualCost = (bookshelfCount * 9 * paperPrice) + 
                       (bookshelfCount * 3 * leatherPrice) + 
                       (Math.ceil(bookshelfCount * 1.5) * logPrice);
      
      while (actualCost > inputValue && bookshelfCount > 0) {
        bookshelfCount--;
        actualCost = (bookshelfCount * 9 * paperPrice) + 
                     (bookshelfCount * 3 * leatherPrice) + 
                     (Math.ceil(bookshelfCount * 1.5) * logPrice);
      }
    } else if (mode === 'stack') {
      bookshelfCount = inputValue * 64;
    } else if (mode === 'shulker') {
      bookshelfCount = inputValue * 27 * 64;
    }

    const logsNeeded = Math.ceil(bookshelfCount * 1.5);
    const totalCost = (bookshelfCount * 9 * paperPrice) + 
                     (bookshelfCount * 3 * leatherPrice) + 
                     (logsNeeded * logPrice);

    const totalRevenue = bookshelfCount * ahPrice;
    const netProfit = totalRevenue - totalCost;
    const profitMargin = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

    return {
      bookshelfCount,
      totalCost,
      totalRevenue,
      netProfit,
      profitMargin,
      breakdown: {
        paper: bookshelfCount * 9,
        leather: bookshelfCount * 3,
        logs: logsNeeded,
      }
    };
  }, [paperPrice, leatherPrice, logPrice, ahPrice, mode, inputValue]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-1 font-medium">
              Donut SMP Economics
            </h1>
            <h2 className="text-3xl font-light tracking-tight">
              Bookshelf Calculator
            </h2>
          </div>
          <div className="text-zinc-500 text-[10px] mono uppercase tracking-widest">
            v2.1.0 / Optimized
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Inputs Section */}
          <section className="md:col-span-5 space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                Market Prices
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Paper', value: paperPrice, setter: setPaperPrice },
                  { label: 'Leather', value: leatherPrice, setter: setLeatherPrice },
                  { label: 'Oak Log', value: logPrice, setter: setLogPrice },
                  { label: 'AH Price', value: ahPrice, setter: setAhPrice },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-600">
                      {item.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px]">$</span>
                      <input 
                        type="number" 
                        value={item.value}
                        onChange={(e) => item.setter(Number(e.target.value))}
                        className="bg-zinc-900 w-full pl-7 pr-3 py-2 rounded-xl text-sm font-medium focus:ring-1 focus:ring-white focus:outline-none transition-all border border-transparent focus:border-white/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                Configuration
              </h3>
              <div className="flex gap-2">
                {(['investment', 'stack', 'shulker'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setInputValue(m === 'investment' ? 1000 : 1);
                    }}
                    className={`flex-1 text-[9px] uppercase tracking-widest py-2 rounded-lg border transition-all ${
                      mode === m 
                        ? 'bg-white text-black border-white' 
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-zinc-600">
                  {mode === 'investment' ? 'Investment' : 'Quantity'}
                </label>
                <div className="relative">
                  {mode === 'investment' && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">$</span>}
                  <input 
                    type="number" 
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className={`bg-zinc-900 w-full ${mode === 'investment' ? 'pl-8' : 'px-4'} py-3 rounded-xl text-2xl font-light focus:ring-1 focus:ring-white focus:outline-none transition-all border border-transparent focus:border-white/20 tracking-tighter`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="md:col-span-7">
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl h-full flex flex-col justify-between space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">
                    Output
                  </h4>
                  <div className="text-6xl font-light tracking-tighter leading-none">
                    {results.bookshelfCount.toLocaleString()}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mt-1">
                    Bookshelves
                  </div>
                </div>
                <div className="bg-white text-black px-3 py-1 rounded-full">
                  <div className="text-[10px] font-bold tracking-tighter">
                    {results.profitMargin.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-900">
                  <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-zinc-500 mb-1">
                    <TrendingDown size={10} /> Cost
                  </div>
                  <div className="text-lg font-medium tracking-tight">
                    {formatCurrency(results.totalCost)}
                  </div>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-900">
                  <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-zinc-500 mb-1">
                    <TrendingUp size={10} /> Revenue
                  </div>
                  <div className="text-lg font-medium tracking-tight">
                    {formatCurrency(results.totalRevenue)}
                  </div>
                </div>
              </div>

              <div className="bg-white text-black p-5 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">
                    Net Profit
                  </div>
                  <div className={`text-3xl font-bold tracking-tighter ${results.netProfit < 0 ? 'line-through opacity-40' : ''}`}>
                    {results.netProfit < 0 ? '-' : '+'}{formatCurrency(Math.abs(results.netProfit))}
                  </div>
                </div>
                {results.netProfit < 0 && (
                  <div className="text-[9px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1 rounded">
                    Loss
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-900">
                <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-zinc-500 mb-3">
                  <Info size={10} /> Materials
                </div>
                <div className="flex justify-between gap-2">
                  {[
                    { label: 'Paper', value: results.breakdown.paper },
                    { label: 'Leather', value: results.breakdown.leather },
                    { label: 'Logs', value: results.breakdown.logs },
                  ].map((item) => (
                    <div key={item.label} className="flex-1 text-center">
                      <div className="text-sm font-medium mb-0.5">
                        {item.value.toLocaleString()}
                      </div>
                      <div className="text-[8px] uppercase tracking-widest text-zinc-600">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-10 pt-6 border-t border-zinc-900 flex justify-between items-center text-zinc-600 text-[8px] uppercase tracking-[0.3em]">
          <div>Donut SMP Economics</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

