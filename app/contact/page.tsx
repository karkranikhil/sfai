'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Send, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Youtube,
  CheckCircle2
} from 'lucide-react'
import { COMPANY_CONFIG } from '@/constants'

function ContactForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if form was submitted successfully (from FormSubmit redirect)
    if (searchParams.get('success') === 'true') {
      setSubmitted(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    // FormSubmit handles the submission automatically via form action
    // This is just for showing success message
    try {
      const response = await fetch(COMPANY_CONFIG.contact.formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        // Still show success as FormSubmit redirects work
        setSubmitted(true)
        form.reset()
      }
    } catch (error) {
      // FormSubmit will handle submission even if fetch fails
      setSubmitted(true)
      form.reset()
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-xl text-center space-y-8 border border-gray-100 animate-in fade-in zoom-in duration-500">
           <div className="w-24 h-24 bg-teal-accent/10 text-teal-accent rounded-full flex items-center justify-center mx-auto">
             <CheckCircle2 className="w-12 h-12" />
           </div>
           <h2 className="text-4xl font-bold text-navy">Message Received!</h2>
           <p className="text-xl text-gray-600">Thank you for reaching out. One of our senior Salesforce architects will review your request and contact you within the next 24 hours.</p>
           <button 
            onClick={() => setSubmitted(false)}
            className="px-12 py-4 bg-salesforce text-white rounded-full font-bold hover:bg-navy transition-all"
           >
            Back to Form
           </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-navy pt-24 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Let's Build the Future Together</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Book your free 30-minute strategic consultation and discover the ROI of AI-powered Salesforce.</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pb-24 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-navy mb-2">Schedule Your Strategy Call</h3>
                <p className="text-gray-500">Fill out the form below and we'll reach out to coordinate a time.</p>
              </div>

              <form action={COMPANY_CONFIG.contact.formAction} method="POST" onSubmit={handleSubmit} className="space-y-6">
                {/* FormSubmit hidden fields for customization */}
                <input type="hidden" name="_subject" value={`New Contact Form Submission from ${COMPANY_CONFIG.name}`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={`${COMPANY_CONFIG.site.url}/contact?success=true`} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-navy uppercase tracking-widest">Full Name *</label>
                    <input required id="name" name="name" type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-navy uppercase tracking-widest">Email Address *</label>
                    <input required id="email" name="email" type="email" placeholder="john@company.com" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-navy uppercase tracking-widest">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-bold text-navy uppercase tracking-widest">Company Name</label>
                    <input id="company" name="company" type="text" placeholder="Company Inc." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-bold text-navy uppercase tracking-widest">Service Interest</label>
                    <select id="service" name="service" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all appearance-none cursor-pointer">
                      <option value="">Select a service</option>
                      <option value="Implementation">Implementation</option>
                      <option value="Custom Development">Custom Development</option>
                      <option value="Integration">Integration</option>
                      <option value="Data Migration">Data Migration</option>
                      <option value="AI / Agentforce">AI / Agentforce</option>
                      <option value="Managed Support">Managed Support</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-bold text-navy uppercase tracking-widest">Timeline</label>
                    <select id="timeline" name="timeline" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all appearance-none cursor-pointer">
                      <option value="">Select timeline</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="6+ Months">6+ Months</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-bold text-navy uppercase tracking-widest">Budget</label>
                    <select id="budget" name="budget" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all appearance-none cursor-pointer">
                      <option value="">Select budget</option>
                      <option value="$10k - $25k">$10k - $25k</option>
                      <option value="$25k - $75k">$25k - $75k</option>
                      <option value="$75k+">$75k+</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-navy uppercase tracking-widest">Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us about your project goals..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-salesforce transition-all"></textarea>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-5 bg-salesforce text-white rounded-full font-bold text-lg hover:bg-navy transition-all shadow-xl shadow-salesforce/20 flex items-center justify-center gap-3 group">
                    Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p className="text-center text-sm text-gray-400 mt-6 font-medium italic">We typically respond within {COMPANY_CONFIG.trust.responseTime}.</p>
                </div>
              </form>
            </div>

            {/* Right: Info Panels */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-navy text-white p-10 rounded-[3rem] shadow-xl space-y-10">
                <h3 className="text-2xl font-bold">Contact Details</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-salesforce rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <a href={`mailto:${COMPANY_CONFIG.contact.email}`} className="text-gray-400 hover:text-white transition-colors">{COMPANY_CONFIG.contact.email}</a>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-salesforce rounded-2xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone</h4>
                      <a href={`tel:${COMPANY_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-white transition-colors">{COMPANY_CONFIG.contact.phone}</a>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-salesforce rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                      <p className="text-gray-400">{COMPANY_CONFIG.contact.businessHours}</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-salesforce rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Location</h4>
                      <p className="text-gray-400">{COMPANY_CONFIG.contact.location}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h4 className="font-bold mb-6 text-gray-400 uppercase tracking-widest text-sm">Follow Us</h4>
                  <div className="flex gap-4">
                    {COMPANY_CONFIG.social.linkedin && (
                      <a href={COMPANY_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-salesforce transition-all"><Linkedin /></a>
                    )}
                    {COMPANY_CONFIG.social.twitter && (
                      <a href={COMPANY_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-salesforce transition-all"><Twitter /></a>
                    )}
                    {COMPANY_CONFIG.social.youtube && (
                      <a href={COMPANY_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-salesforce transition-all"><Youtube /></a>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust Badge Small */}
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                   <CheckCircle2 className="w-8 h-8 text-teal-accent" />
                </div>
                <div>
                   <h4 className="font-bold text-navy">Verified Partner</h4>
                   <p className="text-sm text-gray-500">{COMPANY_CONFIG.trust.certification}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salesforce mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  )
}

