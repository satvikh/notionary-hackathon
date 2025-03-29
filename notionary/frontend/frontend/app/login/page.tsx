"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/select-notes")
    }, 1000)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/select-notes")
    }, 1000)
  }

  const handleNotionConnect = () => {
    setIsLoading(true)

    // Simulate Notion OAuth process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/select-notes")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-black"></div>
            <span className="text-xl font-medium">Notionary</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to Notionary</CardTitle>
                    <CardDescription>Enter your credentials to access your quizzes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleNotionConnect} disabled={isLoading}>
                      <svg viewBox="0 0 120 126" className="h-4 w-4 mr-2" fill="currentColor">
                        <path d="M20.6927 21.9315C24.5502 25.9384 26.6071 24.6866 35.8727 23.805C45.1384 22.9235 67.6071 22.0419 72.2094 22.0419C76.8118 22.0419 81.1384 22.9235 76.8118 28.1718C72.4852 33.4201 69.3845 36.9949 72.2094 39.1299C75.0344 41.2649 81.1384 40.3833 82.5762 43.0768C84.014 45.7702 81.9571 48.4637 84.7821 50.5987C87.6071 52.7336 95.4466 53.6152 95.4466 59.7451C95.4466 65.875 90.9852 67.1268 90.9852 71.4935C90.9852 75.8601 95.4466 76.7417 95.4466 80.2269C95.4466 83.7121 92.8974 85.8471 92.8974 90.2138C92.8974 94.5804 97.3587 96.7154 97.3587 99.3193C97.3587 101.923 95.4466 104.617 95.4466 104.617C95.4466 104.617 91.5384 107.311 72.2094 107.311C52.8805 107.311 31.9645 109.446 26.6071 109.446C21.2497 109.446 17.8732 107.311 17.8732 101.042C17.8732 94.7721 23.1124 91.9866 23.1124 88.0788C23.1124 84.1711 18.6511 82.0361 18.6511 78.5509C18.6511 75.0657 23.1124 73.3028 23.1124 69.3951C23.1124 65.4873 18.6511 63.3523 18.6511 59.7451C18.6511 56.1379 23.1124 54.4967 23.1124 50.5987C23.1124 46.7007 18.6511 44.5658 18.6511 40.8369C18.6511 37.108 23.1124 35.555 23.1124 31.6472C23.1124 27.7394 16.7305 17.9247 20.6927 21.9315Z"></path>
                      </svg>
                      Connect with Notion
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create account"}
                      </Button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleNotionConnect} disabled={isLoading}>
                      <svg viewBox="0 0 120 126" className="h-4 w-4 mr-2" fill="currentColor">
                        <path d="M20.6927 21.9315C24.5502 25.9384 26.6071 24.6866 35.8727 23.805C45.1384 22.9235 67.6071 22.0419 72.2094 22.0419C76.8118 22.0419 81.1384 22.9235 76.8118 28.1718C72.4852 33.4201 69.3845 36.9949 72.2094 39.1299C75.0344 41.2649 81.1384 40.3833 82.5762 43.0768C84.014 45.7702 81.9571 48.4637 84.7821 50.5987C87.6071 52.7336 95.4466 53.6152 95.4466 59.7451C95.4466 65.875 90.9852 67.1268 90.9852 71.4935C90.9852 75.8601 95.4466 76.7417 95.4466 80.2269C95.4466 83.7121 92.8974 85.8471 92.8974 90.2138C92.8974 94.5804 97.3587 96.7154 97.3587 99.3193C97.3587 101.923 95.4466 104.617 95.4466 104.617C95.4466 104.617 91.5384 107.311 72.2094 107.311C52.8805 107.311 31.9645 109.446 26.6071 109.446C21.2497 109.446 17.8732 107.311 17.8732 101.042C17.8732 94.7721 23.1124 91.9866 23.1124 88.0788C23.1124 84.1711 18.6511 82.0361 18.6511 78.5509C18.6511 75.0657 23.1124 73.3028 23.1124 69.3951C23.1124 65.4873 18.6511 63.3523 18.6511 59.7451C18.6511 56.1379 23.1124 54.4967 23.1124 50.5987C23.1124 46.7007 18.6511 44.5658 18.6511 40.8369C18.6511 37.108 23.1124 35.555 23.1124 31.6472C23.1124 27.7394 16.7305 17.9247 20.6927 21.9315Z"></path>
                      </svg>
                      Connect with Notion
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">© 2024 Notionary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

