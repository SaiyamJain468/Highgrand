"use client"

import { Package, Download } from "lucide-react"

export default function ResellerDashboard() {
  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Partner Dashboard</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Welcome back. Access catalogs, track your wholesale history, and manage your account.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-brand-surface1 border border-brand-border p-6">
          <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-4">Total Orders</p>
          <p className="font-bebas text-[40px] text-brand-white">0</p>
        </div>
        <div className="bg-brand-surface1 border border-brand-border p-6">
          <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-4">Account Status</p>
          <p className="font-bebas text-[40px] text-brand-success">ACTIVE</p>
        </div>
        <div className="bg-brand-surface1 border border-brand-border p-6">
          <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-4">Current Margin Tier</p>
          <p className="font-bebas text-[40px] text-brand-accent">BASE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-bebas text-[28px] text-brand-white uppercase mb-6">Recent Orders</h2>
          <div className="border border-brand-border border-dashed p-16 text-center bg-brand-surface1/30">
            <Package size={40} className="mx-auto text-brand-disabled mb-4" />
            <h3 className="font-inter font-medium text-[16px] text-brand-muted">No orders yet</h3>
            <p className="font-inter text-[13px] text-brand-disabled mt-2 mb-6">Your wholesale orders will appear here once placed via WhatsApp.</p>
            <a href="/products" className="inline-block border border-brand-white text-brand-white px-6 py-2.5 font-inter text-[12px] uppercase tracking-widest hover:bg-brand-white hover:text-brand-black transition-colors">
              Browse Catalog
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-bebas text-[28px] text-brand-white uppercase mb-6">Resources</h2>
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-4 bg-brand-surface1 border border-brand-border p-4 hover:border-brand-accent transition-colors">
              <Download size={20} className="text-brand-accent" />
              <div>
                <p className="font-inter font-medium text-[13px] text-brand-white">Product Catalog PDF</p>
                <p className="font-inter text-[11px] text-brand-muted mt-1">Updated Spring 2026 Size Chart</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-4 bg-brand-surface1 border border-brand-border p-4 hover:border-brand-accent transition-colors">
              <Download size={20} className="text-brand-accent" />
              <div>
                <p className="font-inter font-medium text-[13px] text-brand-white">High-Res Image Assets</p>
                <p className="font-inter text-[11px] text-brand-muted mt-1">For your website / Instagram</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
