"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  Clock,
  Users,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState<any>(null)
  const [isApplied, setIsApplied] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<"pending" | "accepted" | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(15)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    const jobId = Number.parseInt(params.id as string)

    const postedJobs = JSON.parse(localStorage.getItem("globalPostedJobs") || "[]")
    let foundJob = postedJobs.find((j: any) => j.id === jobId)

    if (!foundJob) {
      // If not found in posted jobs, use default job data
      const defaultJobs = [
        {
          id: 1,
          title: "Café Assistant",
          company: "Downtown Brew",
          location: "Downtown",
          pay: "₹450-500/hour",
          duration: "2 weeks",
          category: "Hospitality",
          description: "Help with serving customers and maintaining the café. Perfect for students!",
          employerEmail: "cafe@downtownbrew.com",
          applicants: 5,
          requirements: ["Communication skills", "Customer service experience", "Flexible schedule"],
          benefits: ["Free meals", "Flexible hours", "Training provided"],
        },
        {
          id: 2,
          title: "Delivery Driver",
          company: "Local Eats",
          location: "Midtown",
          pay: "₹500-625/hour",
          duration: "1 month",
          category: "Logistics",
          description: "Deliver food orders in your area. Flexible hours.",
          employerEmail: "driver@localeats.com",
          applicants: 8,
          requirements: ["Valid driver's license", "Vehicle required", "Good navigation skills"],
          benefits: ["Flexible schedule", "Per delivery bonus"],
        },
        {
          id: 3,
          title: "Tutoring - Math",
          company: "StudyHub",
          location: "Near University",
          pay: "₹625-750/hour",
          duration: "3 months",
          category: "Education",
          description: "Tutor high school students in mathematics. Remote or in-person.",
          employerEmail: "tutoring@studyhub.com",
          applicants: 3,
          requirements: ["Math expertise", "Teaching experience", "Patient with students"],
          benefits: ["Remote option", "Flexible hours"],
        },
        {
          id: 4,
          title: "Event Staff",
          company: "EventPro",
          location: "City Center",
          pay: "₹550-700/hour",
          duration: "1 week",
          category: "Events",
          description: "Help set up and manage events. Great for networking!",
          employerEmail: "events@eventpro.com",
          applicants: 12,
          requirements: ["Physical stamina", "Team player", "Customer service skills"],
          benefits: ["Networking opportunities", "Performance bonuses"],
        },
        {
          id: 5,
          title: "Shop Assistant",
          company: "Fashion Boutique",
          location: "Downtown",
          pay: "₹425-475/hour",
          duration: "2 months",
          category: "Retail",
          description: "Customer service and stock management in our boutique.",
          employerEmail: "shop@fashionboutique.com",
          applicants: 6,
          requirements: ["Fashion knowledge", "POS system experience", "Sales skills"],
          benefits: ["Staff discount", "Flexible hours"],
        },
        {
          id: 6,
          title: "Social Media Intern",
          company: "TechStart Studio",
          location: "Midtown",
          pay: "₹375-450/hour",
          duration: "2 months",
          category: "Marketing",
          description: "Create content and manage social media accounts. Remote position.",
          employerEmail: "marketing@techstartstudio.com",
          applicants: 15,
          requirements: ["Social media knowledge", "Content creation skills", "Remote work"],
          benefits: ["Remote work", "Portfolio building", "Tech industry experience"],
        },
        {
          id: 7,
          title: "Landscaping Help",
          company: "Green Spaces Ltd",
          location: "Suburbs",
          pay: "₹475-550/hour",
          duration: "6 weeks",
          category: "Labor",
          description: "Garden and landscape maintenance. Physical work, great exercise!",
          employerEmail: "landscaping@greenspaces.com",
          applicants: 4,
          requirements: ["Physical fitness", "Attention to detail", "Outdoor work willing"],
          benefits: ["Flexible schedule", "Equipment provided"],
        },
        {
          id: 8,
          title: "Babysitter/Nanny",
          company: "Family Care Network",
          location: "West Side",
          pay: "₹500-600/hour",
          duration: "3 months",
          category: "Childcare",
          description: "Childcare services for families. Flexible scheduling available.",
          employerEmail: "childcare@familycare.com",
          applicants: 7,
          requirements: ["CPR certification", "Experience with children", "Background check"],
          benefits: ["Flexible hours", "Bonuses for punctuality"],
        },
      ]
      foundJob = defaultJobs.find((j) => j.id === jobId)
    }

    if (foundJob) {
      setJob(foundJob)
    }
  }, [params.id])

  useEffect(() => {
    if (applicationStatus === "pending" && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (applicationStatus === "pending" && timeRemaining === 0) {
      setApplicationStatus("accepted")
      // Save accepted application
      const applications = JSON.parse(localStorage.getItem("jobApplications") || "[]")
      const acceptedApplication = applications.find(
        (app) => app.jobId === Number.parseInt(params.id as string) && app.status === "pending",
      )
      if (acceptedApplication) {
        acceptedApplication.status = "accepted"
        acceptedApplication.rating = 4.5 // Random rating between 3.5-5.5
        acceptedApplication.appliedDate = new Date().toLocaleString()
      }
      localStorage.setItem("jobApplications", JSON.stringify(applications))
    }
  }, [applicationStatus, timeRemaining, params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault()

    const applications = JSON.parse(localStorage.getItem("jobApplications") || "[]")
    const newApplication = {
      id: Date.now(),
      jobTitle: job.title,
      candidateName: formData.name,
      email: formData.email,
      phone: formData.phone,
      rating: Math.random() * 2 + 3.5, // Random rating between 3.5-5.5
      status: "pending",
      appliedDate: new Date().toLocaleDateString(),
      message: formData.message,
    }
    applications.push(newApplication)
    localStorage.setItem("jobApplications", JSON.stringify(applications))
    console.log("[v0] Application submitted:", newApplication)

    setIsApplied(true)
    setShowApplicationForm(false)
    setApplicationStatus("pending")
    setTimeRemaining(15)
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center border border-border">
          <p className="text-muted-foreground">Loading job details...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/jobs">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted">
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-border gap-2 bg-transparent">
              <Bookmark className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <Card className="p-6 mb-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                  <p className="text-lg text-muted-foreground">{job.company}</p>
                </div>
                <span className="px-4 py-2 bg-accent/20 text-accent-foreground font-medium rounded-lg">
                  {job.category}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="font-semibold text-foreground">{job.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-sm">Pay</span>
                  </div>
                  <p className="font-semibold text-foreground">{job.pay}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold text-foreground">{job.duration}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Applicants</span>
                  </div>
                  <p className="font-semibold text-foreground">{job.applicants || 0}</p>
                </div>
              </div>
            </Card>

            {/* Job Description */}
            <Card className="p-6 mb-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">About This Job</h2>
              <p className="text-muted-foreground mb-4">{job.description}</p>

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Requirements</h3>
                  <ul className="space-y-2 mb-6">
                    {job.requirements.map(
                      (req: string, idx: number) =>
                        req && (
                          <li key={idx} className="text-muted-foreground">
                            • {req}
                          </li>
                        ),
                    )}
                  </ul>
                </>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {job.benefits.map(
                      (benefit: string, idx: number) =>
                        benefit && (
                          <li key={idx} className="text-muted-foreground">
                            • {benefit}
                          </li>
                        ),
                    )}
                  </ul>
                </>
              )}
            </Card>

            {/* Application Form */}
            {showApplicationForm && !isApplied && (
              <Card className="p-6 mb-6 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">Apply for This Job</h2>
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cover Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell the employer about yourself..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Submit Application
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border bg-transparent"
                      onClick={() => setShowApplicationForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6 border border-border sticky top-24">
              {applicationStatus === "pending" ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Application Pending</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your application is being reviewed. Auto-acceptance in:
                  </p>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary">{timeRemaining}s</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(timeRemaining / 15) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The employer will automatically accept your application
                  </p>
                </div>
              ) : applicationStatus === "accepted" ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Application Accepted!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Great news! Your application has been accepted. The employer will contact you soon.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-border bg-transparent"
                    onClick={() => {
                      setIsApplied(false)
                      setApplicationStatus(null)
                      setTimeRemaining(15)
                    }}
                  >
                    Back to Jobs
                  </Button>
                </div>
              ) : isApplied ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The employer will review your application and contact you soon.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-border bg-transparent"
                    onClick={() => setIsApplied(false)}
                  >
                    Back
                  </Button>
                </div>
              ) : (
                <>
                  {!showApplicationForm ? (
                    <>
                      <Button
                        onClick={() => setShowApplicationForm(true)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3 h-10"
                      >
                        Apply Now
                      </Button>
                      <Button variant="outline" className="w-full border-border bg-transparent">
                        Message Employer
                      </Button>
                    </>
                  ) : null}
                </>
              )}
            </Card>

            {/* Employer Info */}
            <Card className="p-6 border border-border mb-6">
              <h3 className="font-semibold text-foreground mb-4">About the Employer</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.employerEmail}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.5 (12 reviews)</span>
                </div>
                <p className="text-sm text-muted-foreground">Reliable employer with verified reviews.</p>
              </div>
            </Card>

            {/* Safety Tips */}
            <Card className="p-4 bg-blue-50 border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Safety Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Never send money upfront</li>
                    <li>• Meet in public places</li>
                    <li>• Verify employer credentials</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
