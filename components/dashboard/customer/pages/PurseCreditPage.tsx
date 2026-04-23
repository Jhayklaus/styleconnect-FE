"use client";

const ACTIVITY = [
  { id: "1", icon: "bank", label: "Transfer to bank account", sub: "UBA 100****1010", amount: "$3,500.00", date: "Sep 18" },
  { id: "2", icon: "refund", label: "Refund from cancelled order", sub: "From order ID:143270120", amount: "$3,500.00", date: "Sep 18" },
];

export function PurseCreditPage() {
  return (
    <div className="flex flex-col gap-8 max-w-[600px]">

      {/* Balance card */}
      <div className="bg-[#f5a623] rounded-2xl px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-jost text-sm text-black/80">Pulse balance</p>
          <InfoIcon className="w-4 h-4 text-black/80" />
        </div>
        <p className="font-inter font-medium text-[28px] leading-9 text-black">
          4800100.00
        </p>
        <button className="self-start h-9 px-5 rounded-pill bg-white font-jost text-sm font-medium text-text-900 hover:bg-white/90 transition-colors">
          Withdraw funds
        </button>
      </div>

      {/* Payout method */}
      <section className="flex flex-col gap-3">
        <h2 className="font-jost font-medium text-base text-text-900">Payout method</h2>
        <p className="font-jost text-sm text-text-500">
          Add payout method to activate withdrawal from pulse balance
        </p>
        <button className="self-start h-9 px-5 rounded-pill border bg-gray-200 border-stroke-soft font-jost text-sm text-primary-base hover:bg-gray-200/50 transition-colors">
          Add payout method
        </button>
      </section>

      <div className="h-px bg-stroke-soft" />

      {/* Activity summary */}
      <section className="flex flex-col gap-3">
        <h2 className="font-jost font-medium text-base text-text-900">Activity summary</h2>
        <div className="flex flex-col gap-5">
          {ACTIVITY.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                {item.icon === "bank" ? <BankIcon className="w-4 h-4 text-text-500" /> : null}
                {item.icon === "refund" ? <RefundIcon className="w-4 h-4 text-text-500" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-jost text-sm text-text-900">{item.label}</p>
                <p className="font-jost text-xs text-text-500">{item.sub}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-jost text-sm font-medium text-text-900">{item.amount}</p>
                <p className="font-jost text-xs text-text-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 9v5M10 7v.01" />
    </svg>
  );
}

function BankIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5583 1.84688L17.6416 5.80522C17.8496 5.90903 18.0244 6.06874 18.1466 6.26644C18.2688 6.46414 18.3334 6.69198 18.3333 6.92438V8.12438C18.3333 8.69938 17.8666 9.16605 17.2916 9.16605H16.6666V15.8327H17.5C17.721 15.8327 17.9329 15.9205 18.0892 16.0768C18.2455 16.2331 18.3333 16.445 18.3333 16.6661C18.3333 16.8871 18.2455 17.099 18.0892 17.2553C17.9329 17.4116 17.721 17.4994 17.5 17.4994H2.49996C2.27895 17.4994 2.06698 17.4116 1.9107 17.2553C1.75442 17.099 1.66663 16.8871 1.66663 16.6661C1.66663 16.445 1.75442 16.2331 1.9107 16.0768C2.06698 15.9205 2.27895 15.8327 2.49996 15.8327H3.33329V9.16605H2.70829C2.13329 9.16605 1.66663 8.69938 1.66663 8.12438V6.92438C1.66663 6.48938 1.89163 6.08938 2.25496 5.86272L9.44079 1.84688C9.6144 1.76005 9.80585 1.71484 9.99996 1.71484C10.1941 1.71484 10.3847 1.76005 10.5583 1.84688ZM15 9.16605H4.99996V15.8327H7.49996V10.8327H9.16663V15.8327H10.8333V10.8327H12.5V15.8327H15V9.16605ZM9.99996 3.43105L3.33329 7.18105V7.49938H16.6666V7.18105L9.99996 3.43105ZM9.99996 4.99938C10.221 4.99938 10.4329 5.08718 10.5892 5.24346C10.7455 5.39974 10.8333 5.6117 10.8333 5.83272C10.8333 6.05373 10.7455 6.26569 10.5892 6.42197C10.4329 6.57825 10.221 6.66605 9.99996 6.66605C9.77895 6.66605 9.56698 6.57825 9.4107 6.42197C9.25442 6.26569 9.16663 6.05373 9.16663 5.83272C9.16663 5.6117 9.25442 5.39974 9.4107 5.24346C9.56698 5.08718 9.77895 4.99938 9.99996 4.99938Z" fill="#585251" />
    </svg>


  );
}

function RefundIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10a5 5 0 010 10H3" />
      <path d="M6 5L3 8l3 3" />
    </svg>
  );
}
