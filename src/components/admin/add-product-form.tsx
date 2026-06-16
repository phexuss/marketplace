'use client';

import { Image as ImageIcon, Plus, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import { toast } from 'sonner';
import { createProductAction } from '@/app/admin/actions';
import { CreateProductSchema } from '@/schemas/product';
import { useUploadThing } from '@/utils/uploadthing';

interface Props {
  categories: { id: number; name: string }[];
  styles: { id: number; name: string }[];
  colors: { id: number; name: string; hex: string }[];
  sizes: { id: number; name: string }[];
}

interface LocalImage {
  file: File;
  preview: string;
}

export default function AddProductForm({
  categories = [],
  styles = [],
  colors = [],
  sizes = [],
}: Props) {
  const productName = useId();
  const priceInput = useId();
  const descInput = useId();
  const brandInput = useId();
  const genderInput = useId();
  const styleSelect = useId();
  const categorySelect = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [localImages, setLocalImages] = useState<LocalImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing('imageUploader');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: LocalImage[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setLocalImages((prev) => [...prev, ...newImages]);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setLocalImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const rawData = {
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      description: formData.get('description') as string,
      gender: formData.get('gender') as string,
      brand: formData.get('brand') as string,
      categoryId: formData.get('categoryId') as string,
      styleId: formData.get('styleId') as string,
      images: localImages.length > 0 ? ['placeholder'] : [],
      colorIds: selectedColors,
      sizeIds: selectedSizes,
    };

    const validation = CreateProductSchema.safeParse(rawData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const error of validation.error.issues) {
        const field = error.path[0] as string;
        fieldErrors[field] = error.message;
      }
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsUploading(true);

    try {
      const files = localImages.map((img) => img.file);
      const uploadedFiles = await startUpload(files);

      if (!uploadedFiles) {
        throw new Error('Upload failed');
      }

      const imageUrls = uploadedFiles.map((f) => f.ufsUrl);

      const result = await createProductAction(
        formData,
        imageUrls,
        selectedColors,
        selectedSizes,
      );

      if (!result.success) {
        throw new Error('Failed to create product');
      }

      for (const img of localImages) {
        URL.revokeObjectURL(img.preview);
      }
      setLocalImages([]);
      setSelectedColors([]);
      setSelectedSizes([]);
      setErrors({});
      setIsOpen(false);
      toast.success('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      setErrors({ form: 'Failed to create product. Please try again.' });
      toast.error('Failed to create product');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    for (const img of localImages) {
      URL.revokeObjectURL(img.preview);
    }
    setLocalImages([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setErrors({});
    setIsOpen(false);
  };

  const toggleColor = (colorId: number) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId],
    );
  };

  const toggleSize = (sizeId: number) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId],
    );
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-neutral-800 transition-all active:scale-95 shadow-sm"
      >
        <Plus size={18} />
        Add New Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-100 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 font-display">
                Create Product Card
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar"
            >
              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {errors.form}
                </div>
              )}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                  General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor={productName}
                      className="text-xs font-semibold px-1 text-neutral-600"
                    >
                      Product Name
                    </label>
                    <input
                      id={productName}
                      name="name"
                      type="text"
                      placeholder="e.g. Slim Fit Denim"
                      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all ${
                        errors.name ? 'border-red-400' : 'border-neutral-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 px-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor={priceInput}
                      className="text-xs font-semibold px-1 text-neutral-600"
                    >
                      Price ($)
                    </label>
                    <input
                      id={priceInput}
                      name="price"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="99.99"
                      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all ${
                        errors.price ? 'border-red-400' : 'border-neutral-200'
                      }`}
                    />
                    {errors.price && (
                      <p className="text-xs text-red-500 px-1">
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor={descInput}
                    className="text-xs font-semibold px-1 text-neutral-600"
                  >
                    Description
                  </label>
                  <textarea
                    id={descInput}
                    name="description"
                    placeholder="Tell more about the fabric, fit and style..."
                    className={`w-full border p-3 rounded-xl h-28 focus:ring-2 focus:ring-black outline-none transition-all resize-none ${
                      errors.description
                        ? 'border-red-400'
                        : 'border-neutral-200'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 px-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor={brandInput}
                    className="text-xs font-semibold px-1 text-neutral-600"
                  >
                    Brand
                  </label>
                  <input
                    id={brandInput}
                    name="brand"
                    type="text"
                    placeholder="e.g. ZARA"
                    defaultValue="ZARA"
                    className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all ${
                      errors.brand ? 'border-red-400' : 'border-neutral-200'
                    }`}
                  />
                  {errors.brand && (
                    <p className="text-xs text-red-500 px-1">{errors.brand}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor={genderInput}
                    className="text-xs font-semibold px-1 text-neutral-600"
                  >
                    Gender
                  </label>
                  <select
                    id={genderInput}
                    name="gender"
                    className="w-full border border-neutral-200 p-3 rounded-xl appearance-none bg-neutral-50 cursor-pointer outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="UNISEX">Unisex</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor={categorySelect}
                    className="text-xs font-semibold px-1 text-neutral-600"
                  >
                    Category
                  </label>
                  <select
                    id={categorySelect}
                    name="categoryId"
                    className="w-full border border-neutral-200 p-3 rounded-xl appearance-none bg-neutral-50 cursor-pointer outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor={styleSelect}
                    className="text-xs font-semibold px-1 text-neutral-600"
                  >
                    Dress Style
                  </label>
                  <select
                    id={styleSelect}
                    name="styleId"
                    className="w-full border border-neutral-200 p-3 rounded-xl appearance-none bg-neutral-50 cursor-pointer outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    {styles?.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <h3
                    className={`text-xs font-bold uppercase tracking-widest ${
                      errors.sizeIds ? 'text-red-500' : 'text-neutral-400'
                    }`}
                  >
                    Available Sizes {errors.sizeIds && `• ${errors.sizeIds}`}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes?.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSize(Number(s.id))}
                        className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition-all italic ${
                          selectedSizes.includes(Number(s.id))
                            ? 'bg-black text-white border-black'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3
                    className={`text-xs font-bold uppercase tracking-widest ${
                      errors.colorIds ? 'text-red-500' : 'text-neutral-400'
                    }`}
                  >
                    Colors {errors.colorIds && `• ${errors.colorIds}`}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {colors?.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleColor(Number(c.id))}
                        className={`w-8 h-8 rounded-full border-2 shadow-sm transition-all hover:scale-110 active:scale-90 ${
                          selectedColors.includes(Number(c.id))
                            ? 'border-black ring-2 ring-black ring-offset-2'
                            : 'border-neutral-200'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3
                  className={`text-sm font-bold uppercase tracking-widest ${
                    errors.images ? 'text-red-500' : 'text-neutral-400'
                  }`}
                >
                  Product Media {errors.images && `• ${errors.images}`}
                </h3>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-neutral-200 rounded-2xl p-6 bg-neutral-50/50 hover:bg-neutral-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload size={24} className="text-neutral-400" />
                  <p className="text-sm font-medium text-neutral-600">
                    Click to select images
                  </p>
                  <p className="text-xs text-neutral-400">PNG, JPG up to 8MB</p>
                </button>

                <div className="grid grid-cols-4 gap-4">
                  {localImages.map((img, idx) => (
                    <div
                      key={img.preview}
                      className="relative group aspect-square rounded-xl overflow-hidden border border-neutral-100 shadow-sm"
                    >
                      <Image
                        src={img.preview}
                        fill
                        className="object-cover"
                        alt="Product image preview"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                  {localImages.length === 0 && (
                    <div className="col-span-4 flex flex-col items-center justify-center py-10 text-neutral-400 border border-neutral-100 rounded-xl bg-neutral-50/30 border-dashed">
                      <ImageIcon size={32} strokeWidth={1} />
                      <p className="text-xs mt-2 font-medium tracking-tight">
                        No images selected yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-neutral-100 flex gap-3 bg-neutral-50/50">
              <button
                type="button"
                onClick={handleClose}
                disabled={isUploading}
                className="flex-1 py-3.5 border border-neutral-200 rounded-xl font-bold text-neutral-600 hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  const form = e.currentTarget.closest('.flex')
                    ?.previousElementSibling as HTMLFormElement;
                  form?.requestSubmit();
                }}
                disabled={isUploading}
                className="flex-2 py-3.5 bg-black text-white rounded-xl font-bold shadow-lg hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isUploading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
