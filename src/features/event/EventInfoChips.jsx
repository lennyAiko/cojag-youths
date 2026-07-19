import { EVENT } from './eventDetails';

const CHIPS = [
  { key: 'date', icon: '📅', label: 'Date', value: EVENT.dateShort },
  { key: 'time', icon: '⏰', label: 'Time', value: EVENT.time },
  { key: 'venue', icon: '📍', label: 'Venue', value: EVENT.venueAddress },
];

const EventInfoChips = () => (
  <div className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    {CHIPS.map(({ key, icon, label, value }) => (
      <div
        key={key}
        className="flex min-h-[96px] items-center gap-3 rounded-2xl border border-brand-line bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,17,48,0.04)]"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e9e6ff] text-lg text-brand-blue">
          {icon}
        </span>
        <div className="min-w-0 text-left">
          <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-brand-muted uppercase">
            {label}
          </div>
          <div className="mt-1 text-sm font-bold leading-5 text-brand-ink lg:truncate">
            {value}
          </div>
        </div>
      </div>
    ))}

    {EVENT.isLivestreamed && (
      <div className="flex min-h-[96px] items-center gap-3 rounded-2xl border border-brand-line bg-white/95 px-4 py-3 shadow-[0_6px_18px_rgba(11,17,48,0.04)]">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ffe3e0]">
          <span className="size-2 animate-pulse rounded-full bg-brand-coral" />
        </span>
        <div className="min-w-0 text-left">
          <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-brand-muted uppercase">
            Also
          </div>
          <div className="mt-1 text-sm font-bold leading-5 text-brand-ink break-words">
            Live streaming
          </div>
        </div>
      </div>
    )}
  </div>
);

export default EventInfoChips;
