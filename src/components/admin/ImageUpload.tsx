"use client"

import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus, X, Database } from "lucide-react"
import { useState } from "react"
import MediaLibraryModal from "./MediaLibraryModal"

interface ImageUploadProps {
  value: string[]; // Always an array for flexibility, even if length is 1 for categories
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  maxFiles?: number;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  maxFiles = 10
}: ImageUploadProps) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  const onSelectFromLibrary = (url: string) => {
    if (value.includes(url)) {
      onRemove(url)
    } else {
      onChange(url)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div key={url} className="relative w-[150px] h-[150px] rounded-sm overflow-hidden border border-brand-border group">
            <div className="absolute inset-0 bg-brand-black/50 z-10 hidden group-hover:flex items-center justify-center transition-all">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="bg-brand-error text-white p-2 rounded-full hover:scale-110 transition-transform"
              >
                <X size={16} />
              </button>
            </div>
            <img src={url} alt="Uploaded" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      
      <div className="flex gap-4">
        {value.length < maxFiles && (
          <CldUploadWidget 
            onSuccess={onUpload} 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "highgrand_uploads"}
            options={{ 
              maxFiles: maxFiles === 1 ? 1 : 10,
              sources: ["local", "url", "camera"],
              multiple: maxFiles > 1,
              clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
            }}
          >
            {({ open }) => {
              const onClick = (e: any) => {
                e.preventDefault();
                open();
              }
              return (
                <button
                  type="button"
                  onClick={onClick}
                  className="flex items-center gap-2 px-4 py-3 bg-brand-surface2 border border-brand-border text-brand-white font-inter text-[13px] font-medium hover:bg-brand-surface1 transition-colors"
                >
                  <ImagePlus size={16} />
                  Upload New
                </button>
              )
            }}
          </CldUploadWidget>
        )}

        <button
          type="button"
          onClick={() => setIsLibraryOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-brand-black border border-brand-accent/30 text-brand-accent font-inter text-[13px] font-medium hover:bg-brand-accent hover:text-brand-black transition-all"
        >
          <Database size={16} />
          Choose from Library
        </button>
      </div>

      <MediaLibraryModal 
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelect={onSelectFromLibrary}
        selectedUrls={value}
      />
    </div>
  )
}
