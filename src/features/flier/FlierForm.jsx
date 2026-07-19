import { MAX_NAME_LENGTH } from './flierConfig';

const FlierForm = ({
  photoLabel,
  attendeeName,
  onPhotoChange,
  onNameChange,
  onDownload,
  onShare,
  isDownloading,
  isSharing,
}) => (
  <form
    className="flex flex-col gap-5"
    onSubmit={(event) => event.preventDefault()}
  >
    <div className="flex flex-col gap-2">
      <label
        htmlFor="flier-photo"
        className="text-xs font-bold tracking-[0.14em] text-brand-blue uppercase"
      >
        Your photo
      </label>
      <label
        htmlFor="flier-photo"
        className="cursor-pointer rounded-xl border-2 border-dashed border-brand-line px-5 py-5 text-center text-sm text-brand-muted transition-colors hover:border-brand-blue hover:bg-brand-blue/5 hover:text-brand-ink"
      >
        <b className="text-brand-blue">Tap to upload</b> your photo
        <br />
        <span>{photoLabel || 'JPG or PNG'}</span>
      </label>
      <input
        id="flier-photo"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onPhotoChange(event.target.files?.[0])}
      />
    </div>

    <div className="flex flex-col gap-2">
      <label
        htmlFor="flier-name"
        className="text-xs font-bold tracking-[0.14em] text-brand-blue uppercase"
      >
        Your name
      </label>
      <input
        id="flier-name"
        type="text"
        value={attendeeName}
        onChange={(event) => onNameChange(event.target.value)}
        placeholder="e.g. David Charles"
        maxLength={MAX_NAME_LENGTH}
        className="rounded-xl border border-brand-line bg-brand-paper px-4 py-3 text-brand-ink focus:border-brand-blue focus:outline-none"
      />
      <p className="text-xs text-brand-muted">
        Short names sit best on the flier.
      </p>
    </div>

    <div className="mt-1 flex flex-col gap-3">
      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className="w-full rounded-full bg-brand-coral px-6 py-3.5 font-bold text-white shadow-[0_10px_24px_rgba(255,71,58,0.3)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDownloading ? 'Preparing…' : '⬇ Download my flier'}
      </button>
      <button
        type="button"
        onClick={onShare}
        disabled={isSharing}
        className="w-full rounded-full bg-brand-whatsapp px-6 py-3.5 font-bold text-[#04331a] shadow-[0_10px_24px_rgba(37,211,102,0.32)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSharing ? 'Preparing…' : 'Share to WhatsApp'}
      </button>
      <p className="text-center text-xs text-brand-muted">
        On phones, WhatsApp opens with your flier ready to send.
      </p>
    </div>
  </form>
);

export default FlierForm;
