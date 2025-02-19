import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/contexts/user-context";
import { useLocation } from "wouter";
import { ArrowUpRight, ArrowDownLeft, Lock, History } from "lucide-react";
import type { Transaction } from "@shared/schema";

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const { user } = useUserContext();
  return (
    <div className="space-y-4">
      {transactions.map((tx) => {
        const isSender = tx.fromUserId === user?.id;
        return (
          <Card key={tx.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isSender ? <ArrowUpRight className="text-red-500" /> : <ArrowDownLeft className="text-green-500" />}
                <div>
                  <p className="font-medium">{isSender ? 'Sent' : 'Received'}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className={`font-medium ${isSender ? 'text-red-500' : 'text-green-500'}`}>
                {isSender ? '-' : '+'}{tx.amount} ICP
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useUserContext();

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user,
  });

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Balance</span>
              <Button variant="outline" size="icon">
                <Lock className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{user.balance} ICP</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setLocation("/send")}
            className="h-20"
            variant="outline"
          >
            <ArrowUpRight className="mr-2" />
            Send
          </Button>
          <Button
            onClick={() => setLocation("/receive")}
            className="h-20"
            variant="outline"
          >
            <ArrowDownLeft className="mr-2" />
            Receive
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <TransactionList transactions={transactions} />
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No transactions yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}