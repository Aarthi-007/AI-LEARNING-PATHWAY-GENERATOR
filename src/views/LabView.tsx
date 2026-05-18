import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Scan, Image as ImageIcon, Upload, Sparkles, Loader2, ArrowRight, X } from 'lucide-react';
import { analyzeImage, generateImage } from '../services/geminiService';

export const LabView = () => {
  const [labMode, setLabMode] = useState<'analyze' | 'generate'>('analyze');
  const [labImage, setLabImage] = useState<File | null>(null);
  const [labImagePreview, setLabImagePreview] = useState<string | null>(null);
  const [labPrompt, setLabPrompt] = useState('');
  const [labResult, setLabResult] = useState<{ type: 'text' | 'image', content: string } | null>(null);
  const [labLoading, setLabLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLabImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLabImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLabImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLabAction = async (e: FormEvent) => {
    e.preventDefault();
    if (labMode === 'analyze' && (!labImage || !labPrompt)) return;
    if (labMode === 'generate' && !labPrompt) return;

    setLabLoading(true);
    setError(null);
    try {
      if (labMode === 'analyze' && labImage) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(labImage);
        });
        const base64 = await base64Promise;
        const result = await analyzeImage(base64, labImage.type, labPrompt);
        setLabResult({ type: 'text', content: result });
      } else if (labMode === 'generate') {
        let base64 = '';
        let mimeType = '';
        if (labImage) {
          const reader = new FileReader();
          const base64Promise = new Promise<string>((resolve) => {
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(labImage);
          });
          base64 = await base64Promise;
          mimeType = labImage.type;
        }
        const result = await generateImage(labPrompt, base64, mimeType);
        setLabResult({ type: 'image', content: result });
      }
    } catch (err) {
      setError('AI Lab operation failed. Please try again.');
      console.error(err);
    } finally {
      setLabLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-on-surface mb-4">
          AI Creative Lab
        </h1>
        <p className="text-on-surface-variant text-lg">
          Analyze your study materials or generate custom educational visuals.
        </p>
      </div>

      <div className="flex p-1 bg-surface-container-low rounded-2xl neomorph-inset mb-8">
        <button
          onClick={() => { setLabMode('analyze'); setLabResult(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            labMode === 'analyze' 
              ? 'bg-background neomorph-raised text-primary' 
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Scan className="w-4 h-4" />
          Analyze Image
        </button>
        <button
          onClick={() => { setLabMode('generate'); setLabResult(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            labMode === 'generate' 
              ? 'bg-background neomorph-raised text-primary' 
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Generate/Edit Image
        </button>
      </div>

      <form onSubmit={handleLabAction} className="space-y-6 bg-background neomorph-raised p-8 rounded-3xl border border-white/40">
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {labMode === 'analyze' ? 'Upload Image to Analyze' : 'Reference Image (Optional)'}
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleLabImageChange}
              className="hidden"
              id="lab-image-upload"
            />
            <label 
              htmlFor="lab-image-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-outline-variant rounded-xl cursor-pointer hover:border-primary transition-all bg-surface-container-lowest"
            >
              {labImagePreview ? (
                <img src={labImagePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                  <Upload className="w-6 h-6" />
                  <span className="text-xs">Click to upload image</span>
                </div>
              )}
            </label>
            {labImagePreview && (
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setLabImage(null); setLabImagePreview(null); }}
                className="absolute top-2 right-2 p-1 bg-on-surface text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {labMode === 'analyze' ? 'What should I look for?' : 'Describe the image you want'}
          </label>
          <textarea
            required
            value={labPrompt}
            onChange={(e) => setLabPrompt(e.target.value)}
            placeholder={labMode === 'analyze' ? "e.g. Explain the concepts in this diagram..." : "e.g. A futuristic library with floating books..."}
            className="w-full px-5 py-4 rounded-xl border-none neomorph-inset focus:ring-2 focus:ring-primary/40 text-on-surface bg-background min-h-[100px]"
          />
        </div>

        <button
          disabled={labLoading}
          type="submit"
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(99,102,241,0.4)]"
        >
          {labLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {labMode === 'analyze' ? 'Analyze Image' : 'Generate Image'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        {error && (
          <p className="text-error text-sm text-center font-medium">
            {error}
          </p>
        )}
      </form>

      {labResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-background neomorph-raised rounded-3xl"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Result
          </h3>
          {labResult.type === 'text' ? (
            <div className="prose prose-zinc max-w-none text-on-surface-variant whitespace-pre-wrap">
              {labResult.content}
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-surface-container">
              <img src={labResult.content} alt="Generated" className="w-full h-auto" />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
