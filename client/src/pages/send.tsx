import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { sendFormSchema, type SendFormData } from "@/lib/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "wouter";
import { useUserContext } from "@/contexts/user-context";

export default function Send() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { user } = useUserContext();

  const form = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
    defaultValues: {
      recipientUsername: "",
      amount: 0,
    },
  });

  const send = useMutation({
    mutationFn: async (data: SendFormData) => {
      const res = await apiRequest("POST", "/api/send", {
        ...data,
        fromUserId: user?.id,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      setLocation("/");
      toast({
        title: "Success",
        description: "Transaction completed successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="max-w-md mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SendHorizontal className="h-5 w-5" />
              Send ICP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => send.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="recipientUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (ICP)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={send.isPending}>
                  {send.isPending ? "Sending..." : "Send ICP"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}