"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, MapPin, IndianRupee, Clock, Filter, X, LogOut, ChevronDown } from "lucide-react"

export default function JobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPayRange, setSelectedPayRange] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [allJobs, setAllJobs] = useState([
    {
      id: 1,
      title: "Café Assistant",
      company: "Downtown Brew",
      location: "Downtown",
      pay: "₹450-500/hour",
      payMin: 450,
      duration: "2 weeks",
      category: "Hospitality",
      description: "Help with serving customers and maintaining the café. Perfect for students!",
      posted: "2 hours ago",
      applicants: 5,
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "Local Eats",
      location: "Midtown",
      pay: "₹500-625/hour",
      payMin: 500,
      duration: "1 month",
      category: "Logistics",
      description: "Deliver food orders in your area. Flexible hours.",
      posted: "4 hours ago",
      applicants: 8,
    },
    {
      id: 3,
      title: "Tutoring - Math",
      company: "StudyHub",
      location: "Near University",
      pay: "₹625-750/hour",
      payMin: 625,
      duration: "3 months",
      category: "Education",
      description: "Tutor high school students in mathematics. Remote or in-person.",
      posted: "1 day ago",
      applicants: 3,
    },
    {
      id: 4,
      title: "Event Staff",
      company: "EventPro",
      location: "City Center",
      pay: "₹550-700/hour",
      payMin: 550,
      duration: "1 week",
      category: "Events",
      description: "Help set up and manage events. Great for networking!",
      posted: "6 hours ago",
      applicants: 12,
    },
    {
      id: 5,
      title: "Shop Assistant",
      company: "Fashion Boutique",
      location: "Downtown",
      pay: "₹425-475/hour",
      payMin: 425,
      duration: "2 months",
      category: "Retail",
      description: "Customer service and stock management in our boutique.",
      posted: "8 hours ago",
      applicants: 6,
    },
    {
      id: 6,
      title: "Social Media Intern",
      company: "TechStart Studio",
      location: "Midtown",
      pay: "₹375-450/hour",
      payMin: 375,
      duration: "2 months",
      category: "Marketing",
      description: "Create content and manage social media accounts. Remote position.",
      posted: "12 hours ago",
      applicants: 15,
    },
    {
      id: 7,
      title: "Landscaping Help",
      company: "Green Spaces Ltd",
      location: "Suburbs",
      pay: "₹475-550/hour",
      payMin: 475,
      duration: "6 weeks",
      category: "Labor",
      description: "Garden and landscape maintenance. Physical work, great exercise!",
      posted: "1 day ago",
      applicants: 4,
    },
    {
      id: 8,
      title: "Babysitter/Nanny",
      company: "Family Care Network",
      location: "West Side",
      pay: "₹500-600/hour",
      payMin: 500,
      duration: "3 months",
      category: "Childcare",
      description: "Childcare services for families. Flexible scheduling available.",
      posted: "2 days ago",
      applicants: 7,
    },
  ])

  useEffect(() => {
    if (typeof window === "undefined") return
    const globalJobs = JSON.parse(localStorage.getItem("globalPostedJobs") || "[]")
    if (globalJobs.length > 0) {
      setAllJobs((prev) => [...globalJobs, ...prev])
    }
  }, [])

  const categories = [
    "all",
    "Hospitality",
    "Logistics",
    "Education",
    "Events",
    "Retail",
    "Marketing",
    "Labor",
    "Childcare",
  ]
  const payRanges = [
    { label: "all", min: 0, max: 100000 },
    { label: "₹375-500/hr", min: 375, max: 500 },
    { label: "₹500-625/hr", min: 500, max: 625 },
    { label: "₹625+/hr", min: 625, max: 100000 },
  ]

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory

    const payRange = payRanges.find((r) => r.label === selectedPayRange)
    const matchesPay = selectedPayRange === "all" || job.payMin >= payRange.min

    return matchesSearch && matchesCategory && matchesPay
  })

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Jobs</h1>
            <p className="text-muted-foreground">Find the perfect opportunity in your area</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/70 text-foreground transition"
            >
              <span className="text-sm font-medium">Account</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition border-b border-border"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setShowUserMenu(false)
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-red-500/10 transition flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Filter */}
            <Card className="p-4 mb-6 border border-border">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </Card>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm font-medium ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Pay Range Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Pay Range</h4>
              <div className="space-y-2">
                {payRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPayRange(range.label)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm font-medium ${
                      selectedPayRange === range.label
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {range.label === "all"
                      ? "All Ranges"
                      : range.label === "₹375-500/hr"
                        ? "₹375-500/hr"
                        : range.label === "₹500-625/hr"
                          ? "₹500-625/hr"
                          : "₹625+/hr"}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedPayRange("all")
              }}
              variant="outline"
              className="w-full border-border"
            >
              Reset Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full border-border flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> jobs
              </p>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Link href={`/jobs/${job.id}`} key={job.id}>
                    <Card className="p-6 border border-border hover:shadow-lg hover:border-primary/50 transition cursor-pointer group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition mb-1">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full whitespace-nowrap ml-4">
                          {job.category}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">{job.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <IndianRupee className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">{job.pay}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span className="text-muted-foreground">{job.duration}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>{job.applicants} applied</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">{job.posted}</span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="p-12 text-center border border-border">
                  <p className="text-muted-foreground mb-4">No jobs match your filters</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setSelectedPayRange("all")
                    }}
                    variant="outline"
                    className="border-border"
                  >
                    Reset Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
