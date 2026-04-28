"use client";

import { useEffect, useState } from "react";
import { useVendorModals } from "../VendorModalsContext";

type Direction = "incoming" | "outgoing";
type Kind = "order" | "transfer" | "refund";

type Tx = {
  id: string;
  kind: Kind;
  direction: Direction;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
};

const TXS: Tx[] = [
  {
    id: "t1",
    kind: "order",
    direction: "incoming",
    title: "Payment for order",
    subtitle: "ID1452101200",
    amount: "$3,500.00",
    date: "Sep 18",
  },
  {
    id: "t2",
    kind: "transfer",
    direction: "outgoing",
    title: "Transfer to bank account",
    subtitle: "UBA 100*****2010",
    amount: "$3,500.00",
    date: "Sep 18",
  },
  {
    id: "t3",
    kind: "refund",
    direction: "outgoing",
    title: "Refund from cancelled order",
    subtitle: "From order ID1452101200",
    amount: "$3,500.00",
    date: "Sep 18",
  },
];

type Filter = "all" | Direction;

export function WalletHistoryModal() {
  const { walletHistoryOpen, closeWalletHistory } = useVendorModals();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (!walletHistoryOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [walletHistoryOpen]);

  useEffect(() => {
    if (!walletHistoryOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeWalletHistory();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [walletHistoryOpen, closeWalletHistory]);

  if (!walletHistoryOpen) return null;

  const filtered = filter === "all" ? TXS : TXS.filter((t) => t.direction === filter);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Transaction History">
      <div className="absolute inset-0 bg-black/30" onClick={closeWalletHistory} aria-hidden />

      <div className="absolute inset-y-0 right-0 w-full max-w-[510px] bg-beige-lighter shadow-xl flex flex-col">
        <div className="px-6 pt-6 flex items-start justify-between gap-4">
          <h2 className="font-inter font-medium text-2xl leading-8 text-text-900 tracking-[-0.011em]">
            Transaction History
          </h2>
          <button
            type="button"
            onClick={closeWalletHistory}
            aria-label="Close"
            className="w-10 h-10 rounded-full border border-stroke-soft bg-white flex items-center justify-center text-text-900 hover:bg-beige-base/30 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 mt-5 flex items-center gap-2">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>All</FilterPill>
          <FilterPill active={filter === "incoming"} onClick={() => setFilter("incoming")}>Incoming</FilterPill>
          <FilterPill active={filter === "outgoing"} onClick={() => setFilter("outgoing")}>Outgoing</FilterPill>
        </div>

        <div className="flex-1 overflow-y-auto px-6 mt-6 pb-6">
          {filtered.length === 0 ? <EmptyState /> : <TxList txs={filtered} />}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-pill font-jost font-medium text-sm transition-colors ${active ? "bg-primary-base text-white" : "bg-white border border-stroke-soft text-text-900 hover:bg-beige-base/30"
        }`}
    >
      {children}
    </button>
  );
}

function TxList({ txs }: { txs: Tx[] }) {
  return (
    <ul className="flex flex-col">
      {txs.map((t) => (
        <li key={t.id} className="flex items-center gap-3 py-3 border-b border-stroke-soft last:border-0">
          <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-text-900 shrink-0">
            <TxIcon kind={t.kind} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-jost font-medium text-base text-text-900 truncate">{t.title}</p>
            <p className="font-jost text-sm text-text-500 truncate">{t.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-jost font-medium text-base text-text-900 tabular-nums">{t.amount}</p>
            <p className="font-jost text-sm text-text-500">{t.date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TxIcon({ kind }: { kind: Kind }) {
  if (kind === "order") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33325 4.16602C3.33325 3.50297 3.59664 2.86709 4.06549 2.39825C4.53433 1.92941 5.17021 1.66602 5.83325 1.66602H14.1666C14.8296 1.66602 15.4655 1.92941 15.9344 2.39825C16.4032 2.86709 16.6666 3.50297 16.6666 4.16602V17.4993C16.6665 17.6563 16.6221 17.81 16.5384 17.9429C16.4548 18.0757 16.3354 18.1822 16.1939 18.2501C16.0524 18.318 15.8946 18.3446 15.7386 18.3268C15.5827 18.3089 15.4349 18.2474 15.3124 18.1493L13.7499 16.8993L12.1874 18.1493C12.0273 18.2776 11.8256 18.3423 11.6208 18.3311C11.416 18.3198 11.2225 18.2335 11.0774 18.0885L9.99992 17.011L8.92242 18.0885C8.77742 18.2336 8.58401 18.3201 8.3792 18.3315C8.1744 18.3429 7.97259 18.2783 7.81242 18.1502L6.24992 16.8993L4.68742 18.1493C4.5649 18.2474 4.41716 18.3089 4.26122 18.3268C4.10528 18.3446 3.94747 18.318 3.80598 18.2501C3.66448 18.1822 3.54504 18.0757 3.4614 17.9429C3.37777 17.81 3.33335 17.6563 3.33325 17.4993V4.16602ZM5.83325 3.33268C5.61224 3.33268 5.40028 3.42048 5.244 3.57676C5.08772 3.73304 4.99992 3.945 4.99992 4.16602V15.766L5.72909 15.1827C5.87689 15.0643 6.06058 14.9999 6.24992 14.9999C6.43926 14.9999 6.62295 15.0643 6.77075 15.1827L8.27075 16.3827L9.41075 15.2435C9.56703 15.0873 9.77895 14.9995 9.99992 14.9995C10.2209 14.9995 10.4328 15.0873 10.5891 15.2435L11.7283 16.3827L13.2291 15.1827C13.3769 15.0643 13.5606 14.9999 13.7499 14.9999C13.9393 14.9999 14.1229 15.0643 14.2708 15.1827L14.9999 15.766V4.16602C14.9999 3.945 14.9121 3.73304 14.7558 3.57676C14.5996 3.42048 14.3876 3.33268 14.1666 3.33268H5.83325ZM6.66659 7.49935C6.66659 7.27834 6.75438 7.06637 6.91066 6.91009C7.06694 6.75381 7.2789 6.66602 7.49992 6.66602H12.4999C12.7209 6.66602 12.9329 6.75381 13.0892 6.91009C13.2455 7.06637 13.3333 7.27834 13.3333 7.49935C13.3333 7.72036 13.2455 7.93232 13.0892 8.0886C12.9329 8.24488 12.7209 8.33268 12.4999 8.33268H7.49992C7.2789 8.33268 7.06694 8.24488 6.91066 8.0886C6.75438 7.93232 6.66659 7.72036 6.66659 7.49935ZM7.49992 9.99935C7.2789 9.99935 7.06694 10.0871 6.91066 10.2434C6.75438 10.3997 6.66659 10.6117 6.66659 10.8327C6.66659 11.0537 6.75438 11.2657 6.91066 11.4219C7.06694 11.5782 7.2789 11.666 7.49992 11.666H9.99992C10.2209 11.666 10.4329 11.5782 10.5892 11.4219C10.7455 11.2657 10.8333 11.0537 10.8333 10.8327C10.8333 10.6117 10.7455 10.3997 10.5892 10.2434C10.4329 10.0871 10.2209 9.99935 9.99992 9.99935H7.49992Z" fill="#585251" />
      </svg>
    );
  }
  if (kind === "transfer") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5584 1.84688L17.6417 5.80522C17.8497 5.90903 18.0246 6.06874 18.1467 6.26644C18.2689 6.46414 18.3336 6.69198 18.3334 6.92438V8.12438C18.3334 8.69938 17.8667 9.16605 17.2917 9.16605H16.6667V15.8327H17.5001C17.7211 15.8327 17.9331 15.9205 18.0893 16.0768C18.2456 16.2331 18.3334 16.445 18.3334 16.6661C18.3334 16.8871 18.2456 17.099 18.0893 17.2553C17.9331 17.4116 17.7211 17.4994 17.5001 17.4994H2.50008C2.27907 17.4994 2.06711 17.4116 1.91083 17.2553C1.75455 17.099 1.66675 16.8871 1.66675 16.6661C1.66675 16.445 1.75455 16.2331 1.91083 16.0768C2.06711 15.9205 2.27907 15.8327 2.50008 15.8327H3.33341V9.16605H2.70841C2.13341 9.16605 1.66675 8.69938 1.66675 8.12438V6.92438C1.66675 6.48938 1.89175 6.08938 2.25508 5.86272L9.44091 1.84688C9.61452 1.76005 9.80597 1.71484 10.0001 1.71484C10.1942 1.71484 10.3848 1.76005 10.5584 1.84688ZM15.0001 9.16605H5.00008V15.8327H7.50008V10.8327H9.16675V15.8327H10.8334V10.8327H12.5001V15.8327H15.0001V9.16605ZM10.0001 3.43105L3.33341 7.18105V7.49938H16.6667V7.18105L10.0001 3.43105ZM10.0001 4.99938C10.2211 4.99938 10.4331 5.08718 10.5893 5.24346C10.7456 5.39974 10.8334 5.6117 10.8334 5.83272C10.8334 6.05373 10.7456 6.26569 10.5893 6.42197C10.4331 6.57825 10.2211 6.66605 10.0001 6.66605C9.77907 6.66605 9.56711 6.57825 9.41083 6.42197C9.25455 6.26569 9.16675 6.05373 9.16675 5.83272C9.16675 5.6117 9.25455 5.39974 9.41083 5.24346C9.56711 5.08718 9.77907 4.99938 10.0001 4.99938Z" fill="#585251" />
      </svg>

    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33333 7.49956C3.53744 7.49959 3.73445 7.57453 3.88698 7.71016C4.03951 7.84579 4.13695 8.03269 4.16083 8.2354L4.16667 8.3329V9.16623C4.16662 10.4599 4.66797 11.7032 5.56539 12.635C6.4628 13.5667 7.68643 14.1144 8.97917 14.1629L9.16667 14.1662H12.155L11.4942 13.5054C11.3447 13.3554 11.2579 13.1542 11.2515 12.9426C11.245 12.731 11.3193 12.5248 11.4594 12.366C11.5994 12.2072 11.7946 12.1076 12.0054 12.0876C12.2162 12.0675 12.4267 12.1284 12.5942 12.2579L12.6725 12.3271L14.7558 14.4104C14.8815 14.5355 14.9636 14.6976 14.99 14.8729L15 15.0079C14.9985 15.1911 14.9363 15.3687 14.8233 15.5129L14.7525 15.5921L12.6725 17.6721C12.5225 17.8215 12.3213 17.9083 12.1097 17.9148C11.8981 17.9212 11.6919 17.8469 11.5331 17.7069C11.3743 17.5668 11.2747 17.3716 11.2547 17.1608C11.2346 16.9501 11.2955 16.7396 11.425 16.5721L11.4942 16.4937L12.155 15.8329H9.16667C7.43464 15.8329 5.77062 15.1588 4.52691 13.9533C3.28321 12.7479 2.55746 11.1057 2.50333 9.37456L2.5 9.16623V8.3329C2.5 8.11188 2.5878 7.89992 2.74408 7.74364C2.90036 7.58736 3.11232 7.49956 3.33333 7.49956ZM7.3275 2.32706C7.47746 2.17761 7.6787 2.09084 7.89032 2.08437C8.10194 2.07791 8.30809 2.15224 8.4669 2.29227C8.6257 2.4323 8.72525 2.62752 8.74533 2.83829C8.76541 3.04906 8.70451 3.25957 8.575 3.42706L8.50583 3.5054L7.845 4.16623H10.8333C12.5654 4.16625 14.2294 4.84034 15.4731 6.04579C16.7168 7.25123 17.4425 8.89339 17.4967 10.6246L17.5 10.8329V11.6662C17.4998 11.8786 17.4184 12.0829 17.2726 12.2374C17.1268 12.3918 16.9275 12.4848 16.7155 12.4972C16.5035 12.5097 16.2947 12.4407 16.1318 12.3043C15.9689 12.168 15.8643 11.9746 15.8392 11.7637L15.8333 11.6662V10.8329C15.8334 9.53925 15.332 8.29593 14.4346 7.36417C13.5372 6.43241 12.3136 5.88474 11.0208 5.83623L10.8333 5.8329H7.845L8.50583 6.49373C8.65529 6.64369 8.74206 6.84493 8.74852 7.05655C8.75499 7.26817 8.68065 7.47432 8.54063 7.63313C8.4006 7.79193 8.20537 7.89148 7.9946 7.91156C7.78384 7.93164 7.57333 7.87074 7.40583 7.74123L7.3275 7.67206L5.24417 5.58873C5.10069 5.44524 5.01449 5.25432 5.00176 5.0518C4.98902 4.84928 5.05062 4.64907 5.175 4.48873L5.24417 4.4104L7.3275 2.32706Z" fill="#585251" />
    </svg>

  );
}

function EmptyStateIcon() {
  return (
    <svg width="59" height="62" viewBox="0 0 59 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.9391 58.8566L52.0976 49.2981C54.5708 47.1796 54.8584 43.4564 52.7398 40.9832C51.1517 39.1292 48.6656 38.5035 46.4788 39.2019L46.1982 39.2991L32.5996 43.8927C35.8433 42.8615 39.5334 43.7856 41.8906 46.5374C45.0287 50.2008 44.6025 55.7186 40.9391 58.8566Z" fill="#C4C2C2" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M32.6001 43.8907L46.1987 39.2971L46.4793 39.1999C48.6661 38.5015 51.1522 39.1272 52.7403 40.9812L22.7801 6.00586L0.507812 25.0846L28.6205 57.9031C31.7586 61.5665 37.2762 61.9927 40.9396 58.8546C44.6029 55.7166 45.0291 50.1988 41.891 46.5355C39.5338 43.7837 35.8438 42.8595 32.6001 43.8907Z" fill="white" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M32.5996 43.8926L32.4414 43.9446" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M28.5418 42.402C32.4795 42.402 35.6716 39.21 35.6716 35.2723C35.6716 31.3347 32.4795 28.1426 28.5418 28.1426C24.6042 28.1426 21.4121 31.3347 21.4121 35.2723C21.4121 39.21 24.6042 42.402 28.5418 42.402Z" fill="#9C9998" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3.63112 28.7323C5.64676 27.0056 5.88056 23.9786 4.15388 21.9629L0.507812 25.0861L3.63112 28.7323Z" fill="#9C9998" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M25.9042 9.65198L22.7809 6.00586L19.1348 9.12922C20.8614 11.1449 23.8885 11.3787 25.9042 9.65198Z" fill="#9C9998" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M48.7931 46.1145L56.8153 33.805C58.5934 31.0768 57.8229 27.4229 55.0946 25.6448C53.0494 24.3119 50.4876 24.4102 48.5853 25.6951L48.3434 25.8672L36.584 34.0977C39.4071 32.1964 43.2082 32.0462 46.2438 34.0245C50.285 36.6582 51.4268 42.0733 48.7931 46.1145Z" fill="#ECEBEB" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M36.5843 34.0977L48.3437 25.8672L48.5856 25.6951C50.488 24.4102 53.0497 24.3119 55.095 25.6448L16.5122 0.5L0.5 25.0696L36.7035 48.6637C40.7448 51.2975 46.1598 50.1556 48.7935 46.1144C51.4271 42.0732 50.2854 36.6581 46.2441 34.0244C43.2085 32.0461 39.4075 32.1964 36.5843 34.0977Z" fill="white" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M36.5845 34.0977L36.4473 34.192" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M30.2671 34.9503C34.6765 34.9503 38.251 31.3757 38.251 26.9663C38.251 22.5569 34.6765 18.9824 30.2671 18.9824C25.8577 18.9824 22.2832 22.5569 22.2832 26.9663C22.2832 31.3757 25.8577 34.9503 30.2671 34.9503Z" fill="#C4C2C2" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4.52219 27.6923C5.97128 25.4688 5.34484 22.498 3.12126 21.0488L0.5 25.071L4.52219 27.6923Z" fill="#9C9998" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20.5341 3.12131L16.5119 0.5L13.8906 4.52224C16.1142 5.97138 19.085 5.34495 20.5341 3.12131Z" fill="#9C9998" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M25.9229 24.7969L28.0668 26.9383L25.9229 24.7969Z" fill="#C4C2C2" />
      <path d="M25.9229 24.7969L28.0668 26.9383" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M28.0653 24.7949L25.9238 26.9389L28.0653 24.7949Z" fill="#C4C2C2" />
      <path d="M28.0653 24.7949L25.9238 26.9389" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M32.4688 24.7949L34.6127 26.9363L32.4688 24.7949Z" fill="#C4C2C2" />
      <path d="M32.4688 24.7949L34.6127 26.9363" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M34.6111 24.793L32.4697 26.9369L34.6111 24.793Z" fill="#C4C2C2" />
      <path d="M34.6111 24.793L32.4697 26.9369" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M27.2617 29.1419L32.8173 29.1387L27.2617 29.1419Z" fill="#C4C2C2" />
      <path d="M27.2617 29.1419L32.8173 29.1387" stroke="#9C9998" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <EmptyStateIcon />
      <p className="mt-3 font-inter font-medium text-xl text-text-900">No transactions</p>
      <p className="mt-1 font-jost text-sm text-text-500 max-w-xs">
        You have not received or transferred any money yet
      </p>
    </div>
  );
}
