import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { approveReseller, rejectReseller } from "./actions"

export default async function AdminResellers({ searchParams }: { searchParams: { status?: string } }) {
  const currentStatus = searchParams.status || "PENDING"

  const users = await prisma.user.findMany({
    where: {
      resellerStatus: currentStatus
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase leading-none">Reseller Management</h1>
        <p className="font-inter text-[14px] text-brand-muted mt-2">Approve pending applications and manage active reseller profiles.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-brand-border mb-8">
        <Link 
          href="/admin/resellers?status=PENDING" 
          className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors ${currentStatus === 'PENDING' ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
        >
          Pending Approvals
        </Link>
        <Link 
          href="/admin/resellers?status=APPROVED" 
          className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors ${currentStatus === 'APPROVED' ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
        >
          Active Resellers
        </Link>
        <Link 
          href="/admin/resellers?status=REJECTED" 
          className={`font-inter text-[13px] uppercase tracking-widest pb-4 border-b-2 transition-colors ${currentStatus === 'REJECTED' ? 'text-brand-accent border-brand-accent' : 'text-brand-muted border-transparent hover:text-brand-white'}`}
        >
          Rejected
        </Link>
      </div>

      <div className="bg-brand-surface1 border border-brand-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface2 border-b border-brand-border">
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Date</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Applicant</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Business</th>
                <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Volume</th>
                {currentStatus === 'PENDING' && (
                  <th className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-widest py-4 px-6">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-brand-muted font-inter text-[13px]">No users found for this status.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-brand-border hover:bg-brand-surface2/50 transition-colors">
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-muted">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-inter text-[13px] text-brand-white">{user.name}</p>
                      <p className="font-inter text-[11px] text-brand-muted">{user.email}</p>
                      <p className="font-inter text-[11px] text-brand-muted mt-1">{user.phone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-inter text-[13px] text-brand-white">{user.businessName}</p>
                      <p className="font-inter text-[11px] text-brand-muted">{user.city} ({user.businessType})</p>
                    </td>
                    <td className="py-4 px-6 font-inter text-[13px] text-brand-white">{user.expectedVolume}</td>
                    
                    {currentStatus === 'PENDING' && (
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <form action={async () => {
                            "use server"
                            await approveReseller(user.id)
                          }}>
                            <button type="submit" className="bg-brand-white text-brand-black px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-wider hover:bg-brand-success hover:text-white transition-colors">
                              Approve
                            </button>
                          </form>
                          <form action={async () => {
                            "use server"
                            await rejectReseller(user.id)
                          }}>
                            <button type="submit" className="border border-brand-border text-brand-muted px-3 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-wider hover:border-brand-error hover:text-brand-error transition-colors">
                              Deny
                            </button>
                          </form>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
