"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  const { organisations, loading, selectedOrg, projects, tasks } = useSelector(
    (state: RootState) => state.org
  );
  const session = useSession();

  const { setTheme } = useTheme();

  const sidebarItems = [
    { id: "general", label: "General" },
    { id: "project", label: "Project" },
    { id: "organization", label: "Organization" },
    { id: "tasks", label: "Tasks" },
  ];

  return (
    <div className="container mx-auto py-10 p-2 pt-0">
      <div className="flex gap-6 w-full items-start ">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-lg",
                      activeTab === item.id &&
                      "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Content */}
        </div>{" "}
        <div className=" w-full">
          {/* General Settings */}
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic settings for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Information</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Enter your username" value={session.data?.user?.name || ""} disabled />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" >Email Address</Label>
                      <Input
                        id="email"
                        placeholder="email@example.com"
                        type="email"
                        value={session.data?.user?.email || ""} disabled
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode
                      </p>
                    </div>
                    <Switch
                      checked={useTheme().theme === "dark"}
                      onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Project Settings */}
          {activeTab === "project" && (
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>
                  Manage your project configurations and collaborators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Project Details</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input
                        id="project-name"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Input
                        id="project-description"
                        placeholder="Project description"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Visibility</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Project</p>
                      <p className="text-sm text-muted-foreground">
                        Make this project visible to everyone
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Organization Settings */}
          {activeTab === "organization" && (
            <Card>


              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>
                  Manage your organization details, members and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">General Information</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input
                        id="org-name"
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="org-email">Contact Email</Label>
                      <Input
                        id="org-email"
                        placeholder="contact@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {/* Tasks Settings */}
          {activeTab === "tasks" && (
            <Card>
              <CardHeader>
                <CardTitle>Tasks Settings</CardTitle>
                <CardDescription>
                  Configure how tasks are created, assigned and tracked
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Default Task Settings</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="default-priority">Default Priority</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Task Automation</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-assign Tasks</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign new tasks to team members
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Due Date Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Send reminders for approaching task deadlines
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
