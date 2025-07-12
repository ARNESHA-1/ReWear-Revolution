'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { suggestTags, SuggestTagsInput } from '@/ai/flows/suggest-tags';
import Image from 'next/image';

const itemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  type: z.string().min(1, 'Type is required'),
  size: z.string().min(1, 'Size is required'),
  condition: z.enum(['New with tags', 'Excellent', 'Good', 'Fair']),
});

type ItemFormData = z.infer<typeof itemSchema>;

export default function AddItemForm() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      condition: 'Good',
    },
  });

  const descriptionValue = watch('description');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(URL.createObjectURL(file));
        setImageDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestTags = async () => {
    if (!descriptionValue || !imageDataUri) {
      toast({
        title: 'Heads up!',
        description: 'Please provide a description and upload a photo first.',
        variant: 'destructive',
      });
      return;
    }

    setIsSuggesting(true);
    try {
      const input: SuggestTagsInput = {
        description: descriptionValue,
        photoDataUri: imageDataUri,
      };
      const result = await suggestTags(input);
      if (result.tags) {
        setTags(prev => [...new Set([...prev, ...result.tags])]);
      }
      if (result.category) {
        setValue('category', result.category, { shouldValidate: true });
      }
      toast({
        title: 'Suggestions Added!',
        description: 'AI-powered category and tags have been populated.',
      });
    } catch (error) {
      console.error('Error suggesting tags:', error);
      toast({
        title: 'An error occurred',
        description: 'Could not get AI suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleTagInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (data: ItemFormData) => {
    console.log({ ...data, tags, image: imageDataUri });
    toast({
      title: 'Item Listed!',
      description: 'Your item is now pending approval from our team.',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="image-upload">Item Photo</Label>
        <div className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-muted-foreground relative">
          {imagePreview ? (
            <>
              <Image src={imagePreview} alt="Item preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
              <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 z-10" onClick={() => {setImagePreview(null); setImageDataUri(null); (document.getElementById('image-upload') as HTMLInputElement).value = ''}}>
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
             <>
              <UploadCloud className="w-10 h-10 mb-2" />
              <span>Click or drag to upload</span>
             </>
          )}
          <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
      </div>
    
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} placeholder="e.g., Vintage Denim Jacket" />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} placeholder="Describe your item's style, material, and any wear." rows={4} />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>
      
      <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting || !descriptionValue || !imageDataUri}>
        {isSuggesting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Suggest Category & Tags with AI
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" {...register('category')} placeholder="e.g., Outerwear" />
          {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <Input id="type" {...register('type')} placeholder="e.g., Jacket" />
          {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="size">Size</Label>
          <Input id="size" {...register('size')} placeholder="e.g., M, 10, 42" />
          {errors.size && <p className="text-sm text-destructive">{errors.size.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label>Condition</Label>
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New with tags">New with tags</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-muted-foreground/20">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputChange}
            placeholder="Add tags and press Enter"
            className="flex-1 border-none shadow-none focus-visible:ring-0 p-0 h-auto"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full mt-4">
        List My Item
      </Button>
    </form>
  );
}
