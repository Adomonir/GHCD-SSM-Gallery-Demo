'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ImagePlus, Sparkles } from "lucide-react";
import { UploadZone } from "@/components/upload/UploadZone";
import { Hero, SectionContainer, SectionTitle } from "@/components/ui";

type GalleryVisibility = "Public" | "Private" | "Client Review" | "Draft";

interface CreateGalleryFormState {
  title: string;
  description: string;
  visibility: GalleryVisibility;
  photographer: string;
  tagsInput: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  photographer?: string;
  photos?: string;
}

const INITIAL_FORM_STATE: CreateGalleryFormState = {
  title: "",
  description: "",
  visibility: "Public",
  photographer: "",
  tagsInput: "",
};

const VISIBILITY_OPTIONS: GalleryVisibility[] = ["Public", "Private", "Client Review", "Draft"];

export default function CreateGalleryPage() {
  const [formState, setFormState] = useState<CreateGalleryFormState>(INITIAL_FORM_STATE);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadZoneKey, setUploadZoneKey] = useState(0);

  const parsedTags = useMemo(() => {
    return formState.tagsInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag, index, list) => tag.length > 0 && list.indexOf(tag) === index);
  }, [formState.tagsInput]);

  const updateField = <K extends keyof CreateGalleryFormState>(field: K, value: CreateGalleryFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));

    if (field === "title") {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }

    if (field === "description") {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }

    if (field === "photographer") {
      setErrors((prev) => ({ ...prev, photographer: undefined }));
    }
  };

  const handleUpload = (files: File[]) => {
    setUploadedFiles((prev) => {
      const merged = [...prev];

      files.forEach((file) => {
        const alreadyExists = merged.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        );

        if (!alreadyExists) {
          merged.push(file);
        }
      });

      return merged;
    });

    setErrors((prev) => ({ ...prev, photos: undefined }));
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formState.title.trim()) {
      nextErrors.title = "Gallery title is required.";
    }

    if (!formState.description.trim()) {
      nextErrors.description = "Gallery description is required.";
    }

    if (!formState.photographer.trim()) {
      nextErrors.photographer = "Photographer name is required.";
    }

    if (uploadedFiles.length === 0) {
      nextErrors.photos = "Add at least one photo to create a gallery.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSuccess(false);

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState(INITIAL_FORM_STATE);
    setUploadedFiles([]);
    setUploadZoneKey((prev) => prev + 1);
  };

  return (
    <div className="page-gradient">
      <Hero
        title="Create New Gallery"
        description="Build a new collection with title, tags, and uploads. This flow uses mock handling and is ready for backend integration."
      />

      <SectionContainer className="pt-0">
        <div className="card-base p-6 md:p-8">
          <SectionTitle title="Gallery Details" className="!mb-4" />

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="gallery-title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gallery Title
                </label>
                <input
                  id="gallery-title"
                  type="text"
                  value={formState.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Spring Wedding Highlights"
                  className="form-input"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? "gallery-title-error" : undefined}
                />
                {errors.title && (
                  <p id="gallery-title-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="gallery-visibility" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Visibility
                </label>
                <select
                  id="gallery-visibility"
                  value={formState.visibility}
                  onChange={(event) => updateField("visibility", event.target.value as GalleryVisibility)}
                  className="form-select"
                >
                  {VISIBILITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="gallery-photographer" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Photographer
                </label>
                <input
                  id="gallery-photographer"
                  type="text"
                  value={formState.photographer}
                  onChange={(event) => updateField("photographer", event.target.value)}
                  placeholder="Jane Smith"
                  className="form-input"
                  aria-invalid={Boolean(errors.photographer)}
                  aria-describedby={errors.photographer ? "gallery-photographer-error" : undefined}
                />
                {errors.photographer && (
                  <p id="gallery-photographer-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.photographer}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  id="gallery-description"
                  rows={4}
                  value={formState.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="A curated set of moments from the ceremony and evening reception."
                  className="form-input"
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? "gallery-description-error" : undefined}
                />
                {errors.description && (
                  <p id="gallery-description-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery-tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  id="gallery-tags"
                  type="text"
                  value={formState.tagsInput}
                  onChange={(event) => updateField("tagsInput", event.target.value)}
                  placeholder="wedding, portrait, ceremony"
                  className="form-input"
                />
                {parsedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {parsedTags.map((tag) => (
                      <span key={tag} className="status-badge status-active capitalize">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <SectionTitle title="Upload Photos" className="!mb-4" />
              <UploadZone key={uploadZoneKey} maxFiles={24} onUpload={handleUpload} />
              {errors.photos && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{errors.photos}</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="card-base p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300">
                  <ImagePlus className="h-4 w-4" />
                  <span className="text-sm font-medium">Files Ready</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{uploadedFiles.length}</p>
              </div>

              <div className="card-base p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Parsed Tags</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{parsedTags.length}</p>
              </div>

              <div className="card-base p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Status</span>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {isSuccess ? "Ready to publish" : "Draft in progress"}
                </p>
              </div>
            </div>

            {isSuccess && (
              <div className="rounded-lg border border-green-300 bg-green-50 dark:bg-green-950/40 dark:border-green-700 px-4 py-3 text-sm text-green-800 dark:text-green-300">
                Gallery created successfully in mock mode. Next step is wiring this form to your API route.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" className="btn-primary sm:min-w-44" disabled={isSubmitting}>
                {isSubmitting ? "Creating Gallery..." : "Create Gallery"}
              </button>
              <Link href="/admin" className="btn-secondary text-center sm:min-w-32">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </SectionContainer>
    </div>
  );
}
