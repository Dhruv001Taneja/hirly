"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Briefcase, Users, TrendingUp, ArrowRight, MapPin, IndianRupee, Clock, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredJobs, setFeaturedJobs] = useState([
    {
      id: 1,
      title: "Café Assistant",
      company: "Downtown Brew",
      location: "Downtown",
      pay: "₹450-500/hour",
      duration: "2 weeks",
      category: "Hospitality",
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "Local Eats",
      location: "Midtown",
      pay: "₹500-625/hour",
      duration: "1 month",
      category: "Logistics",
    },
    {
      id: 3,
      title: "Tutoring - Math",
      company: "StudyHub",
      location: "Near University",
      pay: "₹625-750/hour",
      duration: "3 months",
      category: "Education",
    },
    {
      id: 4,
      title: "Event Staff",
      company: "EventPro",
      location: "City Center",
      pay: "₹550-700/hour",
      duration: "1 week",
      category: "Events",
    },
  ])

  useEffect(() => {
    const postedJobs = JSON.parse(localStorage.getItem("globalPostedJobs") || "[]")
    if (postedJobs.length > 0) {
      setFeaturedJobs((prev) => [...postedJobs.slice(0, 4), ...prev].slice(0, 4))
    }
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/jobs")
    }
  }

  const stats = [
    { label: "Active Jobs", value: "1,240+" },
    { label: "Local Businesses", value: "320+" },
    { label: "Job Seekers", value: "4,800+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">LocalJobs</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#jobs" className="text-foreground hover:text-primary transition">
                Find Jobs
              </Link>
              <Link href="#" className="text-foreground hover:text-primary transition">
                Post a Job
              </Link>
              <Link href="#" className="text-foreground hover:text-primary transition">
                Browse Businesses
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
                <Link href="/auth/signin-seeker" className="hover:no-underline">
                  Sign In
                </Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/signup" className="hover:no-underline">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Connect with Local Opportunities
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Find short-term jobs in your neighborhood or post opportunities for your business. Simple, fast, and
            community-focused.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm hover:shadow-md"
              />
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 transition-all shadow-md hover:shadow-lg"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/jobs" className="flex items-center gap-2 text-primary hover:underline">
              Browse all jobs <ArrowRight className="w-4 h-4" />
            </Link>
            <span>•</span>
            <Link href="/auth/signin-employer" className="flex items-center gap-2 text-primary hover:underline">
              Post a job <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 md:p-8 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Have a Job Opening?</h3>
            <p className="text-muted-foreground mb-6">Post your job in seconds and connect with local talent</p>
            <Link href="/auth/signin-employer">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Post a Job Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="p-6 text-center border border-primary/20 hover:border-primary/50 transition-all shadow-sm hover:shadow-md bg-gradient-to-br from-card via-card to-primary/5"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-gradient-to-b from-card via-background to-card border-y border-primary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Featured Opportunities</h3>
              <p className="text-muted-foreground">Latest jobs posted in your area</p>
            </div>
            <Link href="/jobs">
              <Button
                variant="outline"
                className="hidden sm:inline-flex gap-2 bg-transparent border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/5"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <Card className="p-6 border border-primary/20 hover:border-primary/60 transition-all cursor-pointer group shadow-sm hover:shadow-lg bg-gradient-to-br from-card via-card to-secondary/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                        {job.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full">
                      {job.category}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      {job.pay}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {job.duration}
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4 shadow-md hover:shadow-lg transition-all">
                    View & Apply
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">How It Works</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Find Jobs</h4>
            <p className="text-muted-foreground">
              Browse local job opportunities tailored to your location and skills. Filter by category, pay, and
              duration.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg hover:bg-secondary/5 transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-secondary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Connect</h4>
            <p className="text-muted-foreground">
              Apply directly and connect with local business owners. Get instant feedback on your application.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg hover:bg-accent/5 transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Grow</h4>
            <p className="text-muted-foreground">
              Build your experience and reputation with ratings and feedback from employers and peers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-primary/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Find Your Next Opportunity?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of job seekers and businesses already using LocalJobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              Browse Jobs Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent hover:border-primary/80"
            >
              Post a Job
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-primary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">LocalJobs</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting communities through local employment opportunities.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">For Job Seekers</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    My Applications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">For Businesses</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Manage Listings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 LocalJobs. All rights reserved. Connecting communities, one job at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
