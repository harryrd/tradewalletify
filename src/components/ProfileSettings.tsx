
import React, { useState } from "react";
import { ChevronRight, User, Camera, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ProfileSettingsProps {
  onBack: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john.doe@example.com",
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    // This would connect to a backend API in a real app
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
      setIsUploading(false);
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully",
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="py-8 space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronRight className="mr-2 rotate-180" size={16} />
        Back to settings
      </Button>
      
      <h1 className="text-2xl font-semibold">Profile Settings</h1>
      <p className="text-muted-foreground text-sm">Manage your personal information</p>
      
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 border-2 border-primary/10">
            <AvatarImage src={avatarPreview || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              <User size={32} />
            </AvatarFallback>
          </Avatar>
          
          <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer">
            <Camera size={16} />
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*"
              className="hidden" 
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          Click the camera icon to update your profile picture
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <div className="flex items-center">
                  <User size={18} className="mr-2 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex items-center">
                  <Mail size={18} className="mr-2 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full mt-6">
            <Check size={18} />
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;
