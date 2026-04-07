"use client";

import { useState } from "react";

export function ProfilePage() {
  const [firstName, setFirstName] = useState("Gilbert");
  const [lastName, setLastName] = useState("Wellington");
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");

  return (
    <div className="flex flex-col gap-8 max-w-[600px]">

      {/* Avatar */}
      <div className="relative w-16 h-16">
        <AvatarIcon />
        <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-text-900 flex items-center justify-center">
          <CameraIcon />
        </button>
      </div>

      {/* Personal details */}
      <section className="flex flex-col gap-4">
        <h2 className="font-jost font-medium text-base text-text-900">Personal details</h2>

        <Field label="First name" value={firstName} onChange={setFirstName} />
        <Field label="Last name" value={lastName} onChange={setLastName} />

        <div className="flex flex-col gap-1">
          <label className="font-jost text-xs text-text-500">Date of birth</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="DD"
              maxLength={2}
              value={dd}
              onChange={(e) => setDd(e.target.value)}
              className="w-1/3 h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent  outline-none focus:border-primary-base transition-colors text-center placeholder:text-text-400"
            />
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              value={mm}
              onChange={(e) => setMm(e.target.value)}
              className="w-1/3 h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent outline-none focus:border-primary-base transition-colors text-center placeholder:text-text-400"
            />
            <input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              value={yyyy}
              onChange={(e) => setYyyy(e.target.value)}
              className="w-1/3 h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent outline-none focus:border-primary-base transition-colors text-center placeholder:text-text-400"
            />
          </div>
        </div>

        <button className="self-start h-9 px-5 rounded-pill border border-stroke-soft bg-primary-light/20 font-jost text-sm text-white hover:bg-primary-base transition-colors">
          Save changes
        </button>
      </section>

      <Divider />

      {/* Login & security */}
      <section className="flex flex-col gap-4">
        <h2 className="font-jost font-medium text-base text-text-900">Login &amp; security</h2>

        <SecurityRow label="Email address" value="youremailaddress@gmail.com" />
        <SecurityRow label="Phone number" value="+2348175469710" />
        <SecurityRow label="Password" value="••••••••" />
      </section>

      <Divider />

      {/* Delete account */}
      <section className="flex flex-col gap-2">
        <h2 className="font-jost font-medium text-base text-text-900">Delete account</h2>
        <p className="font-jost text-sm text-text-500">
          Permanently remove all access to your account
        </p>
        <button className="self-start mt-1 h-9 px-5 rounded-pill border bg-red-100 font-jost text-sm text-red-600 hover:bg-red-50 transition-colors">
          Delete account
        </button>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-jost text-xs text-text-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent outline-none focus:border-primary-base transition-colors"
      />
    </div>
  );
}

function SecurityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex flex-col gap-0.5">
        <p className="font-jost text-sm text-text-500">{label}</p>
        <p className="font-jost text-sm text-text-900">{value}</p>
      </div>
      <button className="font-jost text-sm text-text-900 hover:text-primary-base transition-colors underline">
        Change
      </button>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-stroke-soft" />;
}

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#140B0A" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3275 8.5C18.6162 8.50019 18.8959 8.6003 19.1192 8.78333L19.2108 8.86667L20.5125 10.1667H22.6667C23.0871 10.1665 23.4921 10.3253 23.8004 10.6112C24.1088 10.8972 24.2976 11.289 24.3292 11.7083L24.3333 11.8333V21.8333C24.3335 22.2538 24.1747 22.6588 23.8887 22.9671C23.6028 23.2754 23.211 23.4643 22.7917 23.4958L22.6667 23.5H9.33332C8.91284 23.5001 8.50785 23.3413 8.19953 23.0554C7.89122 22.7695 7.70236 22.3776 7.67082 21.9583L7.66666 21.8333V11.8333C7.66652 11.4129 7.82533 11.0079 8.11124 10.6995C8.39715 10.3912 8.78903 10.2024 9.20832 10.1708L9.33332 10.1667H11.4883L12.7883 8.86667C12.9926 8.66202 13.2614 8.5345 13.5492 8.50583L13.6725 8.5H18.3275ZM18.155 10.1667H13.845L12.545 11.4667C12.3407 11.6713 12.0719 11.7988 11.7842 11.8275L11.6608 11.8333H9.33332V21.8333H22.6667V11.8333H20.3392C20.0505 11.8331 19.7707 11.733 19.5475 11.55L19.4558 11.4667L18.155 10.1667ZM16 12.25C17.1051 12.25 18.1649 12.689 18.9463 13.4704C19.7277 14.2518 20.1667 15.3116 20.1667 16.4167C20.1667 17.5217 19.7277 18.5815 18.9463 19.3629C18.1649 20.1443 17.1051 20.5833 16 20.5833C14.8949 20.5833 13.8351 20.1443 13.0537 19.3629C12.2723 18.5815 11.8333 17.5217 11.8333 16.4167C11.8333 15.3116 12.2723 14.2518 13.0537 13.4704C13.8351 12.689 14.8949 12.25 16 12.25ZM16 13.9167C15.6717 13.9167 15.3466 13.9813 15.0433 14.107C14.74 14.2326 14.4644 14.4168 14.2322 14.6489C14.0001 14.881 13.8159 15.1566 13.6903 15.46C13.5647 15.7633 13.5 16.0884 13.5 16.4167C13.5 16.745 13.5647 17.0701 13.6903 17.3734C13.8159 17.6767 14.0001 17.9523 14.2322 18.1844C14.4644 18.4166 14.74 18.6007 15.0433 18.7264C15.3466 18.852 15.6717 18.9167 16 18.9167C16.663 18.9167 17.2989 18.6533 17.7678 18.1844C18.2366 17.7156 18.5 17.0797 18.5 16.4167C18.5 15.7536 18.2366 15.1177 17.7678 14.6489C17.2989 14.1801 16.663 13.9167 16 13.9167Z" fill="white" />
    </svg>

  );
}

function AvatarIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="32" fill="#FBDFB1" />
      <g filter="url(#filter0_i_4606_29770)">
        <g clip-path="url(#clip0_4606_29770)">
          <rect width="64" height="64" rx="32" fill="#FBDFB1" />
          <g filter="url(#filter1_di_4606_29770)">
            <ellipse cx="32" cy="60.7996" rx="25.6" ry="19.2" fill="url(#paint0_radial_4606_29770)" shape-rendering="crispEdges" />
            <path d="M31.9996 42.0996C38.9711 42.0996 45.2642 44.2194 49.8023 47.623C54.3402 51.0265 57.1002 55.6906 57.1002 60.7998C57.1001 65.9088 54.34 70.5722 49.8023 73.9756C45.2642 77.3792 38.9711 79.5 31.9996 79.5C25.0282 79.4999 18.7359 77.3791 14.1978 73.9756C9.66014 70.5722 6.90006 65.9089 6.89999 60.7998C6.89999 55.6906 9.65992 51.0265 14.1978 47.623C18.7359 44.2195 25.0282 42.0997 31.9996 42.0996Z" stroke="url(#paint1_radial_4606_29770)" shape-rendering="crispEdges" />
          </g>
          <g filter="url(#filter2_di_4606_29770)">
            <circle cx="32" cy="25.6008" r="12.8" fill="url(#paint2_radial_4606_29770)" shape-rendering="crispEdges" />
            <circle cx="32" cy="25.6008" r="12.3" stroke="url(#paint3_radial_4606_29770)" shape-rendering="crispEdges" />
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_i_4606_29770" x="0" y="-8" width="64" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.7712 0 0 0 0 0.78 0 0 0 0 0.7888 0 0 0 0.48 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4606_29770" />
        </filter>
        <filter id="filter1_di_4606_29770" x="2.39999" y="33.5996" width="59.2" height="54.4004" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1728 0 0 0 0 0.740694 0 0 0 0 0.9472 0 0 0 0.24 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4606_29770" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4606_29770" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_4606_29770" />
        </filter>
        <filter id="filter2_di_4606_29770" x="15.2" y="4.80078" width="33.6" height="41.5996" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1728 0 0 0 0 0.740694 0 0 0 0 0.9472 0 0 0 0.24 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4606_29770" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4606_29770" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_4606_29770" />
        </filter>
        <radialGradient id="paint0_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 41.5996) rotate(90) scale(38.4 51.2)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="paint1_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 41.5996) rotate(90) scale(38.4 51.2)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="paint2_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 12.8008) rotate(90) scale(25.6)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="paint3_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 12.8008) rotate(90) scale(25.6)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <clipPath id="clip0_4606_29770">
          <rect width="64" height="64" rx="32" fill="white" />
        </clipPath>
      </defs>
    </svg>


  )
}
