import { EVENT } from './eventDetails';

const CHIPS = [
  { key: 'date', icon: '📅', label: 'Date', value: EVENT.dateShort },
  { key: 'time', icon: '⏰', label: 'Time', value: EVENT.time },
  { key: 'venue', icon: '📍', label: 'Venue', value: EVENT.venueShort },
];

const EventInfoChips = () => (
  <div className="flex flex-wrap justify-center gap-3">
    {CHIPS.map(({ key, icon, label, value }) => (
      <div
        key={key}
        className="flex items-center gap-3 rounded-2xl border border-brand-line bg-white px-4 py-3 shadow-[0_6px_18px_rgba(11,17,48,0.04)]"
      >
        <span className="grid size-9 place-items-center rounded-lg bg-[#e9e6ff] text-brand-blue">
          {icon}
        </span>
        <div className="text-left">
          <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-brand-muted uppercase">
            {label}
          </div>
          <div className="text-sm font-bold text-brand-ink">{value}</div>
        </div>
      </div>
    ))}

    {EVENT.isLivestreamed && (
      <div className="flex items-center gap-3 rounded-2xl border border-brand-line bg-white px-4 py-3 shadow-[0_6px_18px_rgba(11,17,48,0.04)]">
        <span className="grid size-9 place-items-center rounded-lg bg-[#ffe3e0]">
          <span className="size-2 animate-pulse rounded-full bg-brand-coral" />
        </span>
        <div className="text-left">
          <div className="text-[0.66rem] font-semibold tracking-[0.16em] text-brand-muted uppercase">
            Also
          </div>
          <div className="text-sm font-bold text-brand-ink">Live streaming</div>
        </div>
      </div>
    )}
  </div>
);

export default EventInfoChips;
