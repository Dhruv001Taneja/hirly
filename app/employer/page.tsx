"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Plus,
  Eye,
  Users,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut,
  CheckCircle,
  Clock,
  MessageSquare,
  XCircle,
} from "lucide-react"

export default function EmployerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [postedJobs, setPostedJobs] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  const [employerEmail, setEmployerEmail] = useState("info@business.com")

  useEffect(() => {
    if (typeof window === "undefined") return

    const savedEmail = localStorage.getItem("employerEmail")
    if (savedEmail) {
      setEmployerEmail(savedEmail)
    }

    const savedJobs = localStorage.getItem("globalPostedJobs")
    if (savedJobs) {
      try {
        const jobs = JSON.parse(savedJobs)
        setPostedJobs(jobs)
      } catch (e) {
        console.log("[v0] Error loading jobs:", e)
      }
    }

    const savedApplications = localStorage.getItem("jobApplications")
    if (savedApplications) {
      try {
        const apps = JSON.parse(savedApplications)
        setApplications(apps)
      } catch (e) {
        console.log("[v0] Error loading applications:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("employerEmail")
    router.push("/")
  }

  const handlePostJob = () => {
    router.push("/post-job")
  }

  const handleAcceptApplication = (appId: number) => {
    const updated = applications.map((app) => (app.id === appId ? { ...app, status: "accepted" } : app))
    setApplications(updated)
    localStorage.setItem("jobApplications", JSON.stringify(updated))
    console.log("[v0] Application accepted:", appId)
  }

  const handleRejectApplication = (appId: number) => {
    const updated = applications.map((app) => (app.id === appId ? { ...app, status: "rejected" } : app))
    setApplications(updated)
    localStorage.setItem("jobApplications", JSON.stringify(updated))
    console.log("[v0] Application rejected:", appId)
  }

  const stats = [
    {
      label: "Active Listings",
      value: postedJobs.length.toString(),
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      label: "Total Views",
      value: postedJobs.reduce((sum, job) => sum + (job.views || 0), 0).toString(),
      icon: Eye,
      color: "text-emerald-600",
    },
    {
      label: "Applications",
      value: applications.length.toString(),
      icon: Users,
      color: "text-emerald-600",
    },
  ]

  const businessProfile = {
    businessName: "Local Business",
    industry: "Various",
    location: "City",
    email: employerEmail,
    phone: "(555) 987-6543",
    bio: "Supporting local employment",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition">
              LocalJobs
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Find Talent
              </Button>
            </Link>
            <Button onClick={handlePostJob} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Post New Job
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm" className="border-border bg-transparent">
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
            <Link href="/jobs">
              <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                Find Talent
              </Button>
            </Link>
            <Button
              onClick={() => {
                handlePostJob()
                setMobileMenuOpen(false)
              }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 justify-start"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </Button>
            <Button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              variant="outline"
              className="w-full justify-start border-border bg-transparent"
            >
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
            {/* Business Card */}
            <Card className="p-6 border border-border mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{businessProfile.businessName}</h3>
              <p className="text-sm text-muted-foreground mb-4">{businessProfile.industry}</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Settings className="w-4 h-4 mr-2" />
                Edit Business
              </Button>
            </Card>

            {/* Navigation */}
            <Card className="border border-border overflow-hidden">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-3 font-medium transition ${
                  activeTab === "overview"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "jobs" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                My Job Listings
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "applications"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "settings"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Settings
              </button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                  <Button
                    onClick={handlePostJob}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Post Job
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                      <Card key={idx} className="p-6 border border-border">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground">{stat.label}</h4>
                          <Icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </Card>
                    )
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Recent Applications</h3>
                    <div className="space-y-4">
                      {applications.slice(0, 3).length > 0 ? (
                        applications.slice(0, 3).map((app: any) => (
                          <div key={app.id} className="pb-4 border-b border-border last:border-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-medium text-foreground">
                                  {app.candidateName || app.name || "Applicant"}
                                </p>
                                <p className="text-sm text-muted-foreground">{app.jobTitle}</p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded ${
                                  app.status === "accepted"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : app.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>★ {app.rating ? app.rating.toFixed(1) : 0}</span>
                              <span>•</span>
                              <span>{app.appliedDate || "Recently"}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No applications yet</p>
                      )}
                    </div>
                  </Card>

                  <Card className="border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Active Listings</h3>
                    <div className="space-y-4">
                      {postedJobs.length > 0 ? (
                        postedJobs.map((job: any) => (
                          <div key={job.id} className="pb-4 border-b border-border last:border-0">
                            <p className="font-medium text-foreground mb-2">{job.title}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>👁 {job.views || 0} views</span>
                              <span>•</span>
                              <span>👤 {job.applicants || 0} applications</span>
                              <span>•</span>
                              <span>{job.posted || "Recently"}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No active listings yet</p>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Job Listings Tab */}
            {activeTab === "jobs" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-foreground">My Job Listings</h2>
                  <Button
                    onClick={handlePostJob}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Post New Job
                  </Button>
                </div>

                <div className="space-y-4">
                  {postedJobs.length > 0 ? (
                    postedJobs.map((job: any) => (
                      <Card key={job.id} className="p-6 border border-border hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.location} • {job.posted || "Recently"}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                            active
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-2xl font-bold text-primary">{job.views || 0}</p>
                            <p className="text-xs text-muted-foreground">Views</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-secondary">{job.applicants || 0}</p>
                            <p className="text-xs text-muted-foreground">Applications</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Actions</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Button size="sm" variant="outline" className="border-border bg-transparent">
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="border-border bg-transparent">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-border text-red-600 bg-transparent">
                            Close
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center border border-border">
                      <p className="text-muted-foreground mb-4">No job listings yet</p>
                      <Button
                        onClick={handlePostJob}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Post Your First Job
                      </Button>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Applications</h2>
                <div className="space-y-4">
                  {applications.length > 0 ? (
                    applications.map((app: any) => (
                      <Card key={app.id} className="p-6 border border-border hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {app.candidateName || app.name || "Applicant"}
                            </h3>
                            <p className="text-sm text-muted-foreground">{app.jobTitle || "Job Position"}</p>
                            <p className="text-xs text-muted-foreground mt-1">{app.email || "No email provided"}</p>
                            {app.phone && <p className="text-xs text-muted-foreground">{app.phone}</p>}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                              app.status === "accepted"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {app.status === "accepted" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : app.status === "rejected" ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                            {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Pending"}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < Math.floor(app.rating || 0) ? "text-amber-400" : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="font-semibold text-foreground">
                              {app.rating ? app.rating.toFixed(1) : 0}
                            </span>
                          </div>
                          <span>•</span>
                          <span>{app.appliedDate || "Recently"}</span>
                        </div>

                        {app.message && (
                          <div className="mb-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground italic">"{app.message}"</p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4 border-t border-border flex-wrap">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            View Profile
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border gap-2 bg-transparent hover:bg-muted"
                          >
                            <MessageSquare className="w-4 h-4" />
                            {app.email ? "Contact" : "Message"}
                          </Button>
                          {app.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                onClick={() => handleAcceptApplication(app.id)}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 bg-transparent hover:bg-red-50"
                                onClick={() => handleRejectApplication(app.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "accepted" && (
                            <span className="text-sm text-emerald-600 font-medium py-2">✓ Accepted</span>
                          )}
                          {app.status === "rejected" && (
                            <span className="text-sm text-red-600 font-medium py-2">✗ Rejected</span>
                          )}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center border border-border">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No applications yet</p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Business Settings</h2>
                <Card className="p-6 border border-border">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Business Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                          <input
                            type="text"
                            defaultValue={businessProfile.businessName}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={businessProfile.email}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue={businessProfile.phone}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">About</label>
                          <textarea
                            defaultValue={businessProfile.bio}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <h3 className="font-semibold text-foreground mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <span className="text-sm text-foreground">Email on new applications</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <span className="text-sm text-foreground">Weekly digest</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
                      <Button variant="outline" className="border-border bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
