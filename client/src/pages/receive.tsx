import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, QrCode } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useUserContext } from "@/contexts/user-context";
import { useToast } from "@/hooks/use-toast";

export default function Receive() {
  const [, setLocation] = useLocation();
  const { user } = useUserContext();
  const { toast } = useToast();

  if (!user) {
    setLocation("/login");
    return null;
  }

  const copyUsername = () => {
    navigator.clipboard.writeText(user.username);
    toast({
      title: "Copied!",
      description: "Username copied to clipboard",
    });
  };

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
              <QrCode className="h-5 w-5" />
              Receive ICP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-square bg-white p-4 rounded-lg flex items-center justify-center">
              <div className="text-4xl font-mono border-8 border-primary p-8 rounded-2xl">
                QR
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Your wallet username:</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full font-mono"
                  onClick={copyUsername}
                >
                  {user.username}
                  <Copy className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}