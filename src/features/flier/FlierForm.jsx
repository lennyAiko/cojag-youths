import { MAX_NAME_LENGTH } from './flierConfig';

const FlierForm = ({
  photoLabel,
  attendeeName,
  selectedTemplateId,
  templateOptions,
  onPhotoChange,
  onNameChange,
  onTemplateChange,
  onDownload,
  onShare,
  isDownloading,
  isSharing,
}) => (
  <form
    className="flex flex-col gap-6"
    onSubmit={(event) => event.preventDefault()}
  >
    {/* Photo Upload */}
    <div className="flex flex-col gap-2">
      <label
        htmlFor="flier-photo"
        className="text-xs font-bold tracking-[0.14em] text-brand-blue uppercase"
      >
        Your photo
      </label>
      <label
        htmlFor="flier-photo"
        className="cursor-pointer rounded-2xl border-2 border-dashed border-brand-line px-5 py-6 text-center text-sm text-brand-muted transition-colors hover:border-brand-blue hover:bg-brand-blue/5 hover:text-brand-ink"
      >
        <b className="text-brand-blue block mb-1">Tap to upload your photo</b>
        <span>{photoLabel || 'JPG or PNG • Max 5MB'}</span>
      </label>
      <input
        id="flier-photo"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onPhotoChange(event.target.files?.[0])}
      />
    </div>

    {/* Template Selection - Smaller & No Label */}
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(templateOptions || []).map((template) => {
          const isActive = selectedTemplateId === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onTemplateChange(template.id)}
              className={`group relative rounded-2xl border p-1.5 text-left transition-all active:scale-[0.98] ${
                isActive
                  ? 'border-brand-blue bg-brand-blue/10 shadow-sm'
                  : 'border-brand-line bg-white hover:border-brand-blue hover:shadow-sm'
              }`}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={template.src}
                  alt={template.label}
                  className="h-36 w-full object-cover transition-transform group-active:scale-105"
                />
              </div>

              {/* <div className="mt-2 px-1">
                <p className="text-sm font-medium text-brand-ink">
                  {template.label}
                </p>
              </div> */}

              {isActive && (
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-brand-blue px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                    SELECTED
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>

    {/* Name Input */}
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
        placeholder="e.g. Lennox Charles"
        maxLength={MAX_NAME_LENGTH}
        className="rounded-2xl border border-brand-line bg-brand-paper px-4 py-4 text-brand-ink focus:border-brand-blue focus:outline-none"
      />
      <p className="text-xs text-brand-muted">
        Short names sit best on the flier.
      </p>
    </div>

    {/* Action Buttons */}
    <div className="mt-2 flex flex-col gap-3">
      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className="w-full rounded-full bg-brand-coral px-6 py-4 font-bold text-white shadow-[0_10px_24px_rgba(255,71,58,0.3)] transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDownloading ? 'Preparing…' : '⬇ Download my flier'}
      </button>

      <button
        type="button"
        onClick={onShare}
        disabled={isSharing}
        className="w-full rounded-full bg-brand-whatsapp px-6 py-4 font-bold text-[#04331a] shadow-[0_10px_24px_rgba(37,211,102,0.32)] transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSharing ? 'Preparing…' : 'Share to WhatsApp'}
      </button>

      <p className="text-center text-xs text-brand-muted pt-1">
        On phones, WhatsApp opens with your flier ready to send.
      </p>
    </div>
  </form>
);

export default FlierForm;
