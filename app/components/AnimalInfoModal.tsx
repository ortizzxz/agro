"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EntityModalProps {
  triggerContent: ReactNode;
  title: string;
  entityCode: string; // unique code to fetch
  fetchEntity: (code: string) => Promise<any>; // function to fetch full data
}

export function EntityModal({ triggerContent, title, entityCode, fetchEntity }: EntityModalProps) {
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // fetch the entity when modal opens
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchEntity(entityCode)
        .then((data) => setEntity(data))
        .finally(() => setLoading(false));
    }
  }, [open, entityCode, fetchEntity]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-2 min-h-[4rem]">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : entity ? (
            Object.entries(entity).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <p>hey</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}