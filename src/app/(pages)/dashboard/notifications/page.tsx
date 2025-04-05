"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { BellIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  timestamp: Date;
}

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [readFilter, setReadFilter] = useState<string>("all");

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "System Update",
      message: "The system will undergo maintenance tonight at 2 AM.",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    },
    {
      id: "2",
      title: "Login Alert",
      message: "A new login was detected from an unknown device.",
      type: "warning",
      read: true,
      timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
    },
    {
      id: "3",
      title: "Error Detected",
      message: "An error occurred during the last file upload process.",
      type: "error",
      read: false,
      timestamp: new Date(Date.now() - 3600000 * 12), // 12 hours ago
    },
    {
      id: "4",
      title: "Task Completed",
      message: "Your report generation task has been completed successfully.",
      type: "success",
      read: false,
      timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
    },
    {
      id: "5",
      title: "New Feature",
      message:
        "We've added a new dashboard analytics feature for you to explore.",
      type: "info",
      read: true,
      timestamp: new Date(Date.now() - 3600000 * 48), // 2 days ago
    },
  ]);

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;

    const matchesReadStatus =
      readFilter === "all" ||
      (readFilter === "read" && notification.read) ||
      (readFilter === "unread" && !notification.read);

    return matchesSearch && matchesType && matchesReadStatus;
  });

  // Function to delete a notification
  const handleDelete = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Get badge variant based on notification type
  const getBadgeVariant = (
    type: string
  ): "default" | "destructive" | "secondary" | "outline" => {
    switch (type) {
      case "info":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      case "success":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <BellIcon className="mr-2 h-6 w-6" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                </SelectContent>
              </Select>
              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Message
                  </TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <TableRow
                      key={notification.id}
                      className={notification.read ? "" : "bg-muted/50"}
                    >
                      <TableCell>
                        <Badge variant={getBadgeVariant(notification.type)}>
                          {notification.type.charAt(0).toUpperCase() +
                            notification.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {notification.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {notification.message}
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(notification.timestamp, {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(notification.id)}
                          aria-label="Delete notification"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No notifications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
