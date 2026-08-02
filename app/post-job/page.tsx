"use client"

export const dynamic = "force-dynamic"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Plus, X, CheckCircle } from "lucide-react"

export default function PostJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    payMin: "",
    payMax: "",
    duration: "",
    category: "",
    requirements: [""],
    benefits: [""],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (index: number, field: "requirements" | "benefits", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (index: number, field: "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    const existingJobs = JSON.parse(localStorage.getItem("globalPostedJobs") || "[]")
    const newJob = {
      id: Date.now(),
      ...formData,
      pay: `₹${formData.payMin}-${formData.payMax}/hour`,
      postedDate: new Date().toLocaleString(),
      status: "active",
      applicants: 0,
      posted: "just now",
      company: localStorage.getItem("companyName") || "Local Business",
      employerEmail: localStorage.getItem("userName") || "employer@example.com",
    }
    existingJobs.push(newJob)
    localStorage.setItem("globalPostedJobs", JSON.stringify(existingJobs))

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage(true)

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        payMin: "",
        payMax: "",
        duration: "",
        category: "",
        requirements: [""],
        benefits: [""],
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/employer")
      }, 2000)
    }, 1500)
  }

  const handleSaveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("jobDrafts") || "[]")
    drafts.push({
      id: Date.now(),
      ...formData,
      savedDate: new Date().toLocaleString(),
    })
    localStorage.setItem("jobDrafts", JSON.stringify(drafts))
    alert("Job draft saved successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage ? (
          <div className="flex items-center justify-center min-h-screen">
            <Card className="p-12 border border-border text-center max-w-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Job Posted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your job listing is now live and visible to all job seekers across all logins!
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to employer dashboard...</p>
            </Card>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
            <p className="text-muted-foreground mb-8">
              Create a job listing to attract local talent - visible to all job seekers
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Café Assistant, Delivery Driver"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a category</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="retail">Retail</option>
                      <option value="logistics">Logistics</option>
                      <option value="education">Education</option>
                      <option value="events">Events</option>
                      <option value="labor">Labor</option>
                      <option value="childcare">Childcare</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Describe the job, responsibilities, and what you're looking for..."
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* Job Details */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Job Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Downtown, Midtown"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Duration *</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select duration</option>
                      <option value="1-week">1 Week</option>
                      <option value="2-weeks">2 Weeks</option>
                      <option value="1-month">1 Month</option>
                      <option value="2-months">2 Months</option>
                      <option value="3-months">3 Months</option>
                      <option value="6-months">6 Months</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Minimum Hourly Rate *</label>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground">₹</span>
                      <input
                        type="number"
                        name="payMin"
                        value={formData.payMin}
                        onChange={handleInputChange}
                        required
                        placeholder="375"
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-foreground">/hr</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Maximum Hourly Rate *</label>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground">₹</span>
                      <input
                        type="number"
                        name="payMax"
                        value={formData.payMax}
                        onChange={handleInputChange}
                        required
                        placeholder="625"
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-foreground">/hr</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Requirements */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
                <div className="space-y-3">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayChange(index, "requirements", e.target.value)}
                        placeholder="e.g., Must be 18 years old"
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {formData.requirements.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-border bg-transparent"
                          onClick={() => removeArrayItem(index, "requirements")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border gap-2 bg-transparent"
                    onClick={() => addArrayItem("requirements")}
                  >
                    <Plus className="w-4 h-4" />
                    Add Requirement
                  </Button>
                </div>
              </Card>

              {/* Benefits */}
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Benefits (Optional)</h2>
                <div className="space-y-3">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange(index, "benefits", e.target.value)}
                        placeholder="e.g., Free meals, Flexible hours"
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {formData.benefits.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-border bg-transparent"
                          onClick={() => removeArrayItem(index, "benefits")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border gap-2 bg-transparent"
                    onClick={() => addArrayItem("benefits")}
                  >
                    <Plus className="w-4 h-4" />
                    Add Benefit
                  </Button>
                </div>
              </Card>

              {/* Submit */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="border-border bg-transparent"
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
