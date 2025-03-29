import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import NotionaryScreenshot from "./Notionary Screenshot.png";


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/select-notes" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-black"></div>
            <span className="text-xl font-medium">Notionary</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/login?tab=signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Turn your Notion notes into verbal quizzes.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Use AI to test yourself on your own content—automatically.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Connect Notion <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mockup Image */}
          <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border shadow-lg">
            <div className="aspect-[16/9] bg-gray-100">
              <img
                src="/NotionaryScreenshot.png"
                alt="Mockup"
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="container px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="mt-6 text-xl font-medium">Connect your Notion account</h3>
                <p className="mt-2 text-muted-foreground">
                  Securely link your Notion workspace to access your notes and pages.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="mt-6 text-xl font-medium">Select your notes</h3>
                <p className="mt-2 text-muted-foreground">
                  Choose which pages or databases you want to create quizzes from.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="mt-6 text-xl font-medium">Start your verbal quiz</h3>
                <p className="mt-2 text-muted-foreground">
                  Answer questions out loud and get instant feedback on your knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Features</h2>
              <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-8">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Voice Recognition</h3>
                  <p className="text-muted-foreground">
                    Answer quiz questions verbally for a hands-free learning experience.
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium">AI-Generated Questions</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes your notes to create relevant and challenging questions.
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor your learning progress and identify areas for improvement.
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 2H2v10h10V2z"></path>
                      <path d="M12 12H2v10h10V12z"></path>
                      <path d="M22 2h-10v20h10V2z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Seamless Integration</h3>
                  <p className="text-muted-foreground">Works directly with your existing Notion pages and databases.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl bg-primary/5 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to transform your learning?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Start quizzing yourself on your Notion notes today.</p>
            <div className="mt-8">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">© 2024 Notionary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

