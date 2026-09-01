"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { toast } from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { submitContactInquiry } from "@/services/contactService";
import { getErrorMessage } from "@/utils/getErrorMessage";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  message: z.string().min(10, "Please tell us a bit more (at least 10 characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContactInquiry(data);
      reset();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to send your message. Please try again."));
      throw err;
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent</h3>
        <p className="text-gray-600">We&apos;ve received your inquiry and will be in touch shortly.</p>
        <Button type="button" variant="link" onClick={() => reset()} className="mt-6 p-0">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
          placeholder="How can we help you?"
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full font-semibold" isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
