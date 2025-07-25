"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Activity } from "./pages/activities-page";
import formatDateFr from "@/utils/formatDateFr";

interface ActivityModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityModal({ activity, isOpen, onClose }: ActivityModalProps) {
  if (!activity) return null;

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "VELO":
        return "bg-blue-100 text-blue-800";
      case "MARCHE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDistance = (activity: Activity) => {
    if (activity.type === "MARCHE" || activity.type === "VELO") {
      return `${activity.distanceKm}km (${activity.steps || Math.round(activity.distanceKm * 1500)} pas)`;
    }
    return `${activity.distanceKm}km`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Détails</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="text-sm">{activity.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Utilisateur</p>
              <p className="text-sm">{activity.user.name}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="text-sm">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <Badge className={getActivityTypeColor(activity.type)}>{activity.type}</Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Distance</p>
            <p className="text-sm">{formatDistance(activity)}</p>
          </div>

          {activity.steps && (
            <div>
              <p className="text-sm font-medium text-gray-500">Pas</p>
              <p className="text-sm">{activity.steps.toLocaleString()} pas</p>
            </div>
          )}

          <Separator />

          <div>
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="text-sm">{formatDateFr(new Date(activity.createdAt || 0))}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
