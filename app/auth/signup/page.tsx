"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Briefcase, Mail, Lock, User, MapPin } from "lucide-react"

export default function SignupPage() {
  const [userType, setUserType] = useState<"seeker" | "employer" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    businessName: "",
    industry: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { userType, ...formData })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Type Selection */}
        {!userType ? (
          <Card className="p-8 border border-border">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Create Your Account</h1>
            <p className="text-muted-foreground text-center mb-8">Choose how you want to use LocalJobs</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Seeker Card */}
              <button
                onClick={() => setUserType("seeker")}
                className="p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Find Jobs</h3>
                <p className="text-muted-foreground text-sm">
                  I'm looking for local job opportunities and want to apply to positions
                </p>
              </button>

              {/* Employer Card */}
              <button
                onClick={() => setUserType("employer")}
                className="p-6 border-2 border-border rounded-lg hover:border-secondary hover:bg-secondary/5 transition text-left"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Post Jobs</h3>
                <p className="text-muted-foreground text-sm">I'm a business owner and want to post job opportunities</p>
              </button>
            </div>
          </Card>
        ) : (
          /* Sign Up Form */
          <Card className="p-8 border border-border">
            <button
              onClick={() => {
                setUserType(null)
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  location: "",
                  businessName: "",
                  industry: "",
                })
              }}
              className="text-muted-foreground hover:text-foreground text-sm mb-6 flex items-center gap-1"
            >
              ← Change account type
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {userType === "seeker" ? "Create Job Seeker Account" : "Create Business Account"}
            </h1>
            <p className="text-muted-foreground mb-8">
              {userType === "seeker"
                ? "Join thousands of job seekers finding local opportunities"
                : "Post jobs and find the right talent for your business"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Business Name (Employer only) */}
              {userType === "employer" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Business Name *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      placeholder="Downtown Brew"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Downtown"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Industry (Employer only) */}
              {userType === "employer" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select an industry</option>
                    <option value="food">Food & Beverage</option>
                    <option value="retail">Retail</option>
                    <option value="education">Education</option>
                    <option value="logistics">Logistics</option>
                    <option value="events">Events</option>
                    <option value="tech">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 rounded" />
                <span className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 font-medium"
              >
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
