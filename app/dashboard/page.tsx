"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle,
  ClockIcon,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("applications")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [appliedWork, setAppliedWork] = useState<any[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    // Load applied work from localStorage
    const savedAppliedWork = localStorage.getItem("appliedWork")
    if (savedAppliedWork) {
      try {
        setAppliedWork(JSON.parse(savedAppliedWork))
      } catch (e) {
        console.log("[v0] Error parsing applied work:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handlePostJob = () => {
    router.push("/post-job")
  }

  const handleWithdraw = (workId: number) => {
    setSelectedWorkId(workId)
    setShowConfirmDialog(true)
  }

  const confirmWithdraw = () => {
    if (selectedWorkId !== null) {
      const updatedWork = appliedWork.filter((work) => work.id !== selectedWorkId)
      setAppliedWork(updatedWork)
      localStorage.setItem("appliedWork", JSON.stringify(updatedWork))
      setShowConfirmDialog(false)
      setSelectedWorkId(null)
    }
  }

  const applications = [
    {
      id: 1,
      jobTitle: "Café Assistant",
      company: "Downtown Brew",
      location: "Downtown",
      appliedDate: "2 days ago",
      status: "pending",
      pay: "₹450-500/hour",
    },
    {
      id: 2,
      jobTitle: "Delivery Driver",
      company: "Local Eats",
      location: "Midtown",
      appliedDate: "5 days ago",
      status: "accepted",
      pay: "₹500-625/hour",
    },
    {
      id: 3,
      jobTitle: "Event Staff",
      company: "EventPro",
      location: "City Center",
      appliedDate: "1 week ago",
      status: "rejected",
      pay: "₹550-700/hour",
    },
  ]

  const savedJobs = [
    {
      id: 1,
      title: "Tutoring - Math",
      company: "StudyHub",
      location: "Near University",
      pay: "₹625-750/hour",
      duration: "3 months",
      category: "Education",
    },
    {
      id: 2,
      title: "Shop Assistant",
      company: "Fashion Boutique",
      location: "Downtown",
      pay: "₹425-475/hour",
      duration: "2 months",
      category: "Retail",
    },
  ]

  const userProfile = {
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "Downtown",
    bio: "Student looking for part-time work",
    rating: 4.5,
    reviewsCount: 8,
    jobsCompleted: 5,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="w-4 h-4" />
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "in-progress":
        return <Briefcase className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
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
                Browse Jobs
              </Button>
            </Link>
            <Button onClick={handlePostJob} variant="ghost" className="text-foreground hover:text-primary">
              Post a Job
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-border bg-transparent hover:bg-red-500/10 text-red-500 hover:text-red-600"
            >
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
                Browse Jobs
              </Button>
            </Link>
            <Button
              onClick={() => {
                handlePostJob()
                setMobileMenuOpen(false)
              }}
              variant="ghost"
              className="w-full justify-start text-foreground hover:text-primary"
            >
              Post a Job
            </Button>
            <Button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              variant="outline"
              className="w-full justify-start border-border bg-transparent hover:bg-red-500/10 text-red-500 hover:text-red-600"
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
            {/* Profile Card */}
            <Card className="p-6 border border-border mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">AJ</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{userProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{userProfile.location}</p>
              </div>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userProfile.jobsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Jobs Completed</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.floor(userProfile.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {userProfile.rating} ({userProfile.reviewsCount} reviews)
                </p>
              </div>

              <Button
                onClick={() => setActiveTab("profile")}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Card>

            {/* Navigation */}
            <Card className="border border-border overflow-hidden">
              <button
                onClick={() => setActiveTab("applications")}
                className={`w-full text-left px-4 py-3 font-medium transition ${
                  activeTab === "applications"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                My Applications
              </button>
              <button
                onClick={() => setActiveTab("applied-work")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "applied-work"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Applied Work
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "saved" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Saved Jobs
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 font-medium transition border-t border-border ${
                  activeTab === "profile"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Profile & Settings
              </button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">My Applications</h2>
                <div className="space-y-4">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <Card key={app.id} className="p-6 border border-border hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">{app.jobTitle}</h3>
                            <p className="text-muted-foreground">{app.company}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(app.status)}`}
                          >
                            {getStatusIcon(app.status)}
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-secondary" />
                            {app.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="w-4 h-4 text-secondary" />
                            {app.pay}
                          </div>
                          <div className="col-span-2 text-muted-foreground">Applied {app.appliedDate}</div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Link href={`/jobs/${app.id}`}>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                              View Job
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="border-border bg-transparent">
                            {app.status === "pending" ? "Withdraw" : "Contact Employer"}
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center border border-border">
                      <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground mb-4">No applications yet</p>
                      <Link href="/jobs">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Jobs</Button>
                      </Link>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Applied Work Tab */}
            {activeTab === "applied-work" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Applied Work</h2>
                <div className="space-y-4">
                  {appliedWork.length > 0 ? (
                    appliedWork.map((work) => (
                      <Card key={work.id} className="p-6 border border-border hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">{work.jobTitle}</h3>
                            <p className="text-muted-foreground">{work.company}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(work.status)}`}
                          >
                            {getStatusIcon(work.status)}
                            {work.status === "in-progress" ? "In Progress" : "Completed"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-secondary" />
                            {work.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="w-4 h-4 text-secondary" />
                            {work.pay}
                          </div>
                          <div className="text-muted-foreground">Started {work.startDate}</div>
                          <div className="text-muted-foreground">{work.daysWorked} days worked</div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border">
                          {work.status === "completed" ? (
                            <>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" className="border-border bg-transparent">
                                Leave Review
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Mark Complete
                              </Button>
                              <Button size="sm" variant="outline" className="border-border bg-transparent">
                                Contact Employer
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 bg-transparent text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleWithdraw(work.id)}
                              >
                                Withdraw
                              </Button>
                            </>
                          )}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center border border-border">
                      <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground mb-4">No active work yet</p>
                      <Link href="/jobs">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Jobs</Button>
                      </Link>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Saved Jobs Tab */}
            {activeTab === "saved" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Saved Jobs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedJobs.map((job) => (
                    <Card key={job.id} className="p-6 border border-border hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded">
                          {job.category}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-secondary" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-secondary" />
                          {job.pay}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary" />
                          {job.duration}
                        </div>
                      </div>

                      <Link href={`/jobs/${job.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Apply Now
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Profile & Settings</h2>
                <Card className="p-6 border border-border">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                          <input
                            type="text"
                            defaultValue={userProfile.name}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={userProfile.email}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue={userProfile.phone}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                          <textarea
                            defaultValue={userProfile.bio}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <h3 className="font-semibold text-foreground mb-4">Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <span className="text-sm text-foreground">Receive job notifications</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                          <span className="text-sm text-foreground">Email me matching opportunities</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded" />
                          <span className="text-sm text-foreground">Show my profile to employers</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border">
                      <Button
                        onClick={() => alert("Profile updated successfully!")}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Save Changes
                      </Button>
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

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-foreground">Withdraw from Job?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to withdraw from this job? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button onClick={confirmWithdraw} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                Withdraw
              </Button>
              <Button
                onClick={() => setShowConfirmDialog(false)}
                variant="outline"
                className="flex-1 border-border bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
