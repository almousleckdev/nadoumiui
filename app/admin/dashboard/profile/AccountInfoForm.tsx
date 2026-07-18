import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { updateAdminProfile } from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { Admin } from "@/types";

export function AccountInfoForm({ admin }: { admin: Admin }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setName(admin.name || "");
    setEmail(admin.email || "");
    setPhone(admin.phone || "");
    setCountry(admin.country || "");
  }, [admin]);

  const updateProfileMutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: (updatedAdmin) => {
      queryClient.setQueryData(["adminProfile"], updatedAdmin);
      toast.success("Profile information updated successfully!");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to update profile info."));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    updateProfileMutation.mutate({
      name,
      email,
      phone: phone || null,
      country: country || null,
    });
  };

  return (
    <Card className="p-6 bg-white border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 font-heading mb-6">Account Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Administrator"
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. admin@nadoumi.com"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +86 138 0000 0000"
          />
          <Input
            label="Country/Region"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. China"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" type="submit" isLoading={updateProfileMutation.isPending}>
            Save Information
          </Button>
        </div>
      </form>
    </Card>
  );
}
