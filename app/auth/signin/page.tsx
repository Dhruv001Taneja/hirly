"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Briefcase } from "lucide-react"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">Choose how you want to sign in</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/auth/signin-seeker">
              <Card className="p-6 border border-border hover:border-primary hover:bg-primary/5 transition cursor-pointer h-full">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Job Seeker</h3>
                <p className="text-sm text-muted-foreground mt-2">Find and apply for jobs</p>
              </Card>
            </Link>

            <Link href="/auth/signin-employer">
              <Card className="p-6 border border-border hover:border-secondary hover:bg-secondary/5 transition cursor-pointer h-full">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground">Job Giver</h3>
                <p className="text-sm text-muted-foreground mt-2">Post jobs and hire talent</p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-muted-foreground mt-8">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
