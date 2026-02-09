"use client";
import { Bell } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getNotification } from "@/app/lib/notification.api";
import { getUserFromToken } from "@/app/lib/auth";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const u = getUserFromToken();
    if (u) setUser(u);
  }, []);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      const data = await getNotification(user.authUserId);

      if (!Array.isArray(data)) return;

      // 🧠 REMOVE DUPLICATES
      const unique = Array.from(
        new Map(data.map((n: any) => [n._id, n])).values(),
      );

      setNotifications(unique);
      setHasUnread(unique.some((n) => !n.read));
    } catch (error) {
      console.log("Notification error", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  // close on outside click
  useEffect(() => {
    const handler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-secondary transition"
      >
        <Bell size={22} />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[420px] bg-card border border-border rounded-2xl shadow-xl p-4 z-50">
          <h3 className="font-semibold text-base mb-3">Notifications</h3>

          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">
              You're all caught up 🎉
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-3 rounded-xl border transition ${
                    n.read
                      ? "bg-secondary/40 border-border"
                      : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <p className="text-sm font-medium">{n.message}</p>

                  {/* 🕒 Modern date-time row */}
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{formatDate(n.createdAt)}</span>
                    <span>{formatTime(n.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
