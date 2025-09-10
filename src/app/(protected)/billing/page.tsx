"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { checkOutSession } from "@/lib/stripe";
import { api } from "@/trpc/react";
import { Info } from "lucide-react";
import React, { useState, useTransition } from "react";

function page() {
  const { data: user } = api.project.getCredits.useQuery();
  const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100]);
  const creditsToBuyAmount: number = creditsToBuy[0] ?? 0;
  const price = (creditsToBuyAmount / 50).toFixed(2);
  const [isPending, startTransition] = useTransition();


  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold">Billing</h1>

        <p className="mt-2 text-sm text-gray-500">
          Your current balance is {user?.credits} credits.
        </p>
      </div>
      <div className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-4 py-2 text-rose-600">
        <div className="flex items-center gap-2">
          <Info className="size-4" />
          <p className="text-sm">
            Each credit allows you to index 1 file in a repository.
          </p>
        </div>
        <p className="text-sm">
          E.g. If your project has 100 files, you will need 100 credits to index
          all of them. You can buy more credits below.
        </p>
      </div>
      <div className="mt-6">
        <Slider
          defaultValue={[100]}
          max={1000}
          min={50}
          step={10}
          onValueChange={(value) => setCreditsToBuy(value)}
          value={creditsToBuy}
          className="bg-blue-50"
        />
      </div>
      <Button
        className="mt-4"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await checkOutSession(creditsToBuyAmount);
          });
        }}
      >
        {isPending ? "Processing..." : `Buy ${creditsToBuyAmount} credits for $${price}`}
      </Button>
    </div>
  );
}

export default page;
