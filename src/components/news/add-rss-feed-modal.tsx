"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const rssFeedSchema = z.object({
  name: z.string().min(1, "Feed name is required"),
  url: z.string().url("Invalid URL format"),
});

type RssFeedFormData = z.infer<typeof rssFeedSchema>;

interface AddRssFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedAdd: (data: RssFeedFormData) => Promise<void>; // Simulate adding
}

export function AddRssFeedModal({ isOpen, onClose, onFeedAdd }: AddRssFeedModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RssFeedFormData>({
    resolver: zodResolver(rssFeedSchema),
  });

  const onSubmit: SubmitHandler<RssFeedFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await onFeedAdd(data); 
      toast({
        title: "RSS Feed Added",
        description: `"${data.name}" has been successfully added (simulated).`,
      });
      reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add RSS feed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { reset(); onClose(); }}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New RSS Feed</DialogTitle>
          <DialogDescription>
            Enter the details of the RSS feed you want to add. This feature is currently simulated.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input id="name" {...register("name")} className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <div className="col-span-3">
              <Input id="url" {...register("url")} placeholder="https://example.com/feed.xml" className={errors.url ? "border-destructive" : ""} />
              {errors.url && <p className="text-xs text-destructive mt-1">{errors.url.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { reset(); onClose(); }} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Add Feed
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
