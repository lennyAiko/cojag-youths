import { useCallback, useState } from 'react';
import FlierForm from './FlierForm';
import FlierPreview from './FlierPreview';
import { buildFileName, downloadBlob, shareOrDownloadBlob } from './shareFlier';
import { useFlierCanvas } from './useFlierCanvas';

const FlierGenerator = () => {
  const {
    canvasRef,
    isTemplateReady,
    photoLabel,
    attendeeName,
    selectedTemplateId,
    templateOptions,
    setAttendeeName,
    setSelectedTemplateId,
    setPhotoFile,
    getFlierBlob,
  } = useFlierCanvas();

  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const blob = await getFlierBlob();
      if (blob) downloadBlob(blob, buildFileName(attendeeName));
    } finally {
      setIsDownloading(false);
    }
  }, [attendeeName, getFlierBlob]);

  const handleShare = useCallback(async () => {
    setIsSharing(true);
    try {
      const blob = await getFlierBlob();
      if (blob) await shareOrDownloadBlob(blob, buildFileName(attendeeName));
    } finally {
      setIsSharing(false);
    }
  }, [attendeeName, getFlierBlob]);

  return (
    <section className="mx-auto grid w-full max-w-4xl gap-8 rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(11,17,48,0.06)] sm:p-10 md:grid-cols-[1fr_360px]">
      <FlierPreview canvasRef={canvasRef} isTemplateReady={isTemplateReady} />
      <FlierForm
        photoLabel={photoLabel}
        attendeeName={attendeeName}
        selectedTemplateId={selectedTemplateId}
        templateOptions={templateOptions}
        onPhotoChange={setPhotoFile}
        onNameChange={setAttendeeName}
        onTemplateChange={setSelectedTemplateId}
        onDownload={handleDownload}
        onShare={handleShare}
        isDownloading={isDownloading}
        isSharing={isSharing}
      />
    </section>
  );
};

export default FlierGenerator;
