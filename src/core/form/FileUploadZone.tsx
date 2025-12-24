import { ChangeEvent, RefObject } from "react";
import { FaCamera } from "react-icons/fa6";

interface FileUploadZoneProps {
  previewImage: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const FileUploadZone = ({
  previewImage,
  fileInputRef,
  onFileChange,
  onClick,
}: FileUploadZoneProps) => {
  return (
    <div
      className="group hover:border-brand-500 relative flex min-h-[200px] flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 p-4 transition-colors dark:border-slate-600 dark:bg-slate-800"
      onClick={onClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />

      {previewImage ? (
        <>
          <img
            src={previewImage}
            alt="Comprobante"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <FaCamera className="h-6 w-6 text-white" />
            <p className="mt-2 font-medium text-white">Cambiar Imagen</p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-400 transition-transform group-hover:scale-110 dark:bg-slate-700">
            <FaCamera className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Subir Comprobante
          </p>
          <p className="mt-1 text-center text-xs text-slate-400">
            Arrastra o haz clic
          </p>
        </>
      )}
    </div>
  );
};
