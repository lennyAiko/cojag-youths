const FlierPreview = ({ canvasRef, isTemplateReady }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-[repeating-linear-gradient(45deg,#eef0fb_0_10px,#f5f6fd_10px_20px)] p-6">
    <canvas
      ref={canvasRef}
      className="w-full max-w-sm rounded-xl bg-white shadow-[0_20px_50px_rgba(11,17,48,0.24)]"
      role="img"
      aria-label="Preview of your personalised COJAG 2026 convention flier"
    />
    {!isTemplateReady && (
      <p className="text-sm text-brand-muted">Loading template…</p>
    )}
  </div>
);

export default FlierPreview;
