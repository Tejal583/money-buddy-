"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      {/* <div className="absolute top-2 left-2 text-blue-800 font-bold inset-0 bg-gradient-to-b from-indigo-50/50 to-white"> Money Buddy </div> */}
      <section className="relative bg-gradient-to-b from-indigo-50/50 to-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Track Your Money Smartly with Money Buddy 
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Effortlessly manage your finances with AI-powered insights and
            automated categorization
          </p>
          <div className="space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Auto Categorization",
                description:
                  "AI automatically categorizes your transactions with high accuracy",
                icon: "🤖",
              },
              {
                title: "AI Budget Suggestions",
                description:
                  "Get personalized budget recommendations based on your spending patterns",
                icon: "💡",
              },
              {
                title: "PDF Parsing",
                description:
                  "Easily import transactions from bank statements and credit card bills",
                icon: "📄",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "This app has completely transformed how I manage my finances. The AI suggestions are spot on!",
                author: "Sarah J.",
              },
              {
                quote:
                  "The automatic categorization saves me hours every month. Highly recommended!",
                author: "Mike R.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-8">
                <p className="text-gray-600 mb-4 text-lg italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-medium text-gray-900">
                  - {testimonial.author}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Finance Tracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
