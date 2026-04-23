"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Address = {
  id: string;
  name: string;
  phone: string;
  line1: string;
  city: string;
  country: string;
  isDefault: boolean;
};

const MOCK_ADDRESSES: Address[] = [
  {
    id: "1",
    name: "Hakim Adebowale",
    phone: "234816784210",
    line1: "11 Akindele road, New garage Lagos",
    city: "Lagos",
    country: "Nigeria",
    isDefault: true,
  },
];

export function AddressesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  function handleAdd() {
    router.push(`${pathname}?modal=search-address&returnTo=${encodeURIComponent(pathname)}`);
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setMenuOpenId(null);
  }

  function handleMakeDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    setMenuOpenId(null);
  }

  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 py-16 w-2/4">
        <MapPinIllustration />
        <div className="">
          <p className="font-jost font-medium text-base text-text-900">No address saved yet!</p>
          <p className="font-jost text-sm text-text-500 mt-1">
            Save your address for faster checkout and smooth deliveries
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="h-10 px-5 rounded-pill border border-stroke-soft bg-gray-200 font-jost text-sm text-primary-base hover:bg-beige-lighter transition-colors"
        >
          Add delivery address
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-[600px]">
      {addresses.map((addr) => (
        <div key={addr.id} className="relative flex items-start justify-between gap-3 bg-beige-lighter rounded-2xl border border-stroke-soft px-5 py-4">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <p className="font-jost font-medium text-sm text-text-900">{addr.name}</p>
              {addr.isDefault && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 font-jost text-[10px] font-medium text-text-500 uppercase tracking-wide">
                  Default
                </span>
              )}
            </div>
            <p className="font-jost text-xs text-text-500">{addr.phone}</p>
            <p className="font-jost text-sm text-text-900 mt-1">{addr.line1}</p>
            <p className="font-jost text-sm text-text-500">{addr.city}, {addr.country}</p>
          </div>

          {/* 3-dot menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpenId(menuOpenId === addr.id ? null : addr.id)}
              className="p-1.5 rounded-lg hover:bg-beige-lighter transition-colors text-text-500"
            >
              <DotsIcon className="w-4 h-4" />
            </button>

            {menuOpenId === addr.id && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpenId(null)} />
                <div className="absolute right-0 top-8 z-20 bg-beige-lighter rounded-xl border border-stroke-soft shadow-[0px_8px_24px_-4px_rgba(88,92,95,0.12)] min-w-[160px] overflow-hidden">
                  <button
                    onClick={() => setMenuOpenId(null)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-beige-lighter transition-colors"
                  >
                    <EditIcon className="w-4 h-4 text-text-500 shrink-0" />
                    <span className="font-jost text-sm text-text-900">Edit address</span>
                  </button>
                  <button
                    onClick={() => handleMakeDefault(addr.id)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-beige-lighter transition-colors"
                  >
                    <StarIcon className="w-4 h-4 text-text-500 shrink-0" />
                    <span className="font-jost text-sm text-text-900">Make default</span>
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-beige-lighter transition-colors"
                  >
                    <TrashIcon className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="font-jost text-sm text-red-500">Delete address</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="self-start h-10 px-5 bg-gray-200/50 rounded-pill font-jost text-sm text-primary-base hover:bg-gray-200 transition-colors"
      >
        Add delivery address
      </button>
    </div>
  );
}

function MapPinIllustration() {
  return (
    <div className="w-20 h-20 rounded-full bg-[#fef7ec] flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53.75 40L40 46.25V75L55 68.75L53.75 40Z" fill="#B47818" />
        <path d="M67.5 46.25L53.75 40L55 68.75L71.25 75L67.5 46.25Z" fill="#F2AE40" />
        <path d="M26.25 40L40 46.25V75L25 68.75L26.25 40Z" fill="#F2AE40" />
        <path d="M12.5 46.25L26.25 40L25 68.75L8.75 75L12.5 46.25Z" fill="#B47818" />
        <path d="M57.5 22.5C57.5 35 40 50 40 50C40 50 22.5 35 22.5 22.5C22.5 12.8375 30.3375 5 40 5C49.6625 5 57.5 12.8375 57.5 22.5Z" fill="#63322C" />
        <path d="M40 30C44.1421 30 47.5 26.6421 47.5 22.5C47.5 18.3579 44.1421 15 40 15C35.8579 15 32.5 18.3579 32.5 22.5C32.5 26.6421 35.8579 30 40 30Z" fill="white" />
      </svg>

    </div>
  );
}

function DotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="4" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="16" r="1.5" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2.5l3 3L6 17H3v-3L14.5 2.5z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9457 2.36159C13.662 2.0777 13.2854 1.90572 12.8851 1.87725C12.4848 1.84877 12.0876 1.96572 11.7666 2.20659L9.33908 4.02742C8.33066 4.7839 7.14784 5.274 5.89991 5.45242L4.08574 5.71075C3.47741 5.79825 3.03157 6.45325 3.32491 7.09575C3.60074 7.69825 4.47908 9.28659 6.95824 11.8624L3.47657 15.3441C3.39698 15.421 3.3335 15.5129 3.28982 15.6146C3.24615 15.7163 3.22316 15.8256 3.2222 15.9363C3.22124 16.0469 3.24232 16.1566 3.28422 16.259C3.32612 16.3615 3.388 16.4545 3.46625 16.5327C3.54449 16.611 3.63753 16.6729 3.73995 16.7148C3.84236 16.7567 3.95209 16.7778 4.06274 16.7768C4.17339 16.7758 4.28274 16.7528 4.38441 16.7092C4.48608 16.6655 4.57804 16.602 4.65491 16.5224L8.13658 13.0408C10.7124 15.5199 12.3007 16.3983 12.9032 16.6741C13.5449 16.9674 14.2007 16.5216 14.2874 15.9133L14.5466 14.0991C14.725 12.8512 15.2151 11.6683 15.9716 10.6599L17.7916 8.23242C18.0324 7.9114 18.1494 7.51423 18.1209 7.1139C18.0924 6.71357 17.9205 6.33695 17.6366 6.05325L13.9457 2.36159ZM12.7666 3.54075L16.4582 7.23242L14.6382 9.66075C13.7137 10.8932 13.1147 12.3389 12.8966 13.8641L12.7774 14.6983C11.9607 14.1783 10.6082 13.1674 8.71991 11.2791C6.83324 9.39075 5.82157 8.03909 5.30157 7.22242L6.13491 7.10325C7.66041 6.88531 9.10636 6.28629 10.3391 5.36159L12.7666 3.54075Z" fill="#585251" />
    </svg>

  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" />
    </svg>
  );
}
