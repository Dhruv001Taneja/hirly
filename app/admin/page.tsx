"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BarChart3,
  Users,
  Briefcase,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Menu,
  X,
  LogOut,
  Eye,
  Trash2,
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const adminStats = [
    { label: "Total Users", value: "4,823", icon: Users, color: "text-blue-600", trend: "+12% this month" },
    { label: "Active Jobs", value: "1,240", icon: Briefcase, color: "text-green-600", trend: "+8% this month" },
    {
      label: "Total Applications",
      value: "18,402",
      icon: TrendingUp,
      color: "text-purple-600",
      trend: "+25% this month",
    },
    { label: "Revenue", value: "$12,450", icon: BarChart3, color: "text-amber-600", trend: "+15% this month" },
  ]

  const pendingVerifications = [
    {
      id: 1,
      type: "job",
      title: "Software Developer",
      company: "TechCorp Inc",
      submittedBy: "tech@techcorp.com",
      submitted: "2 hours ago",
      reason: "New job listing",
    },
    {
      id: 2,
      type: "user",
      name: "Jane Doe",
      email: "jane@example.com",
      submittedDate: "4 hours ago",
      reason: "New business registration",
    },
    {
      id: 3,
      type: "job",
      title: "Graphic Designer",
      company: "Creative Studio",
      submittedBy: "info@creativestudio.com",
      submitted: "6 hours ago",
      reason: "Updated job listing",
    },
  ]

  const reportedContent = [
    {
      id: 1,
      type: "job",
      item: "Suspicious Job Listing",
      reportedBy: "user@example.com",
      reason: "Potential scam",
      reports: 3,
      status: "pending",
    },
    {
      id: 2,
      type: "user",
      item: "User Profile - Bob Smith",
      reportedBy: "multiple users",
      reason: "Inappropriate content",
      reports: 2,
      status: "pending",
    },
    {
      id: 3,
      type: "review",
      item: "Fake Review",
      reportedBy: "moderator",
      reason: "Misleading rating",
      reports: 5,
      status: "resolved",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joined: "2 hours ago",
      type: "Job Seeker",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joined: "5 hours ago",
      type: "Employer",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      joined: "1 day ago",
      type: "Job Seeker",
      status: "inactive",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition">
              LocalJobs Admin
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                View Site
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="border-border bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border p-4 space-y-2">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                View Site
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start border-border bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border border-border overflow-hidden">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-4 py-3 font-medium transition ${
                  activeTab === "dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("verifications")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "verifications"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Pending Verifications
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "reports"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Reported Content
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "users" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "analytics"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Analytics
              </button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Admin Dashboard</h2>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {adminStats.map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                      <Card key={idx} className="p-6 border border-border">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground">{stat.label}</h4>
                          <Icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.trend}</p>
                      </Card>
                    )
                  })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      Pending Verifications ({pendingVerifications.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingVerifications.slice(0, 3).map((item) => (
                        <div key={item.id} className="pb-3 border-b border-border last:border-0">
                          <p className="text-sm font-medium text-foreground">
                            {item.type === "job" ? item.title : item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.reason}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.submitted || item.submittedDate}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-border bg-transparent">
                      View All
                    </Button>
                  </Card>

                  <Card className="p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Reported Content ({reportedContent.filter((r) => r.status === "pending").length})
                    </h3>
                    <div className="space-y-3">
                      {reportedContent
                        .filter((r) => r.status === "pending")
                        .map((item) => (
                          <div key={item.id} className="pb-3 border-b border-border last:border-0">
                            <p className="text-sm font-medium text-foreground">{item.item}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.reason} • {item.reports} reports
                            </p>
                          </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-border bg-transparent">
                      Review All
                    </Button>
                  </Card>
                </div>
              </div>
            )}

            {/* Verifications Tab */}
            {activeTab === "verifications" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Pending Verifications</h2>
                <div className="space-y-4">
                  {pendingVerifications.map((item) => (
                    <Card key={item.id} className="p-6 border border-border hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {item.type === "job" ? item.title : item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.type === "job" ? item.company : item.email}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          Pending
                        </span>
                      </div>

                      <div className="mb-4 text-sm text-muted-foreground">
                        <p className="mb-1">
                          <strong>Reason:</strong> {item.reason}
                        </p>
                        <p>
                          <strong>Submitted:</strong> {item.submitted || item.submittedDate}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline" className="border-border gap-2 bg-transparent">
                          <Eye className="w-4 h-4" />
                          Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Reported Content</h2>
                <div className="space-y-4">
                  {reportedContent.map((item) => (
                    <Card key={item.id} className="p-6 border border-border hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{item.item}</h3>
                          <p className="text-sm text-muted-foreground">Reason: {item.reason}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.status === "resolved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>

                      <div className="mb-4 text-sm text-muted-foreground">
                        <p>
                          <strong>{item.reports} reports</strong> • Reported by {item.reportedBy}
                        </p>
                      </div>

                      {item.status === "pending" && (
                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white gap-2">
                            <Trash2 className="w-4 h-4" />
                            Remove Content
                          </Button>
                          <Button size="sm" variant="outline" className="border-border bg-transparent">
                            Dismiss Report
                          </Button>
                          <Button size="sm" variant="outline" className="border-border bg-transparent">
                            View Details
                          </Button>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">User Management</h2>
                <Card className="border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user) => (
                          <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition">
                            <td className="px-6 py-3 text-sm text-foreground">{user.name}</td>
                            <td className="px-6 py-3 text-sm text-muted-foreground">{user.email}</td>
                            <td className="px-6 py-3 text-sm text-muted-foreground">{user.type}</td>
                            <td className="px-6 py-3 text-sm text-muted-foreground">{user.joined}</td>
                            <td className="px-6 py-3 text-sm">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-border bg-transparent">
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-border text-red-600 bg-transparent"
                                >
                                  Ban
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
                    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Chart placeholder - User growth trends</p>
                    </div>
                  </Card>
                  <Card className="p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4">Job Postings</h3>
                    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Chart placeholder - Job posting trends</p>
                    </div>
                  </Card>
                  <Card className="p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4">Platform Activity</h3>
                    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Chart placeholder - Overall activity</p>
                    </div>
                  </Card>
                  <Card className="p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4">Revenue</h3>
                    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Chart placeholder - Revenue trends</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
