export default function ReturnsPolicy() {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24">
      <div className="default-container max-w-3xl">
        <h1 className="font-bebas text-[56px] text-brand-white uppercase leading-none tracking-tight mb-8">Shipping & Returns</h1>
        
        <div className="font-inter text-[15px] text-brand-muted leading-relaxed flex flex-col gap-6">
          <p>
            At Highgrand, since all orders are bulk wholesale transactions heavily discounted for B2B partners, our shipping and return policies are structured differently than direct-to-consumer brands.
          </p>
          
          <h2 className="font-bebas text-[32px] text-brand-white uppercase mt-8 border-b border-brand-border pb-4">Shipping Policy</h2>
          <p>
            Orders are dispatched from our Delhi manufacturing unit within 24-48 working hours depending on the order size. Delivery timelines across India typically range from 3-7 business days depending on transport logistics.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-brand-muted">
            <li>For small quantities (1-50 pieces), orders are shipped via standard courier partners (Delhivery, Xpressbees, etc.)</li>
            <li>For large quantities (50+ pieces), orders are shipped via surface transport to minimize shipping costs per piece.</li>
            <li>Shipping costs are calculated at the time of final invoice generation on WhatsApp based on actual weight and dimensions.</li>
          </ul>

          <h2 className="font-bebas text-[32px] text-brand-white uppercase mt-8 border-b border-brand-border pb-4">Return Policy</h2>
          <p>
            Due to the wholesale nature of our business, we do not accept returns for unsold inventory or buyer's remorse. Please review sizing charts carefully before placing bulk orders.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-brand-muted">
            <li>Returns are only accepted for manufacturing defects or receiving incorrect items.</li>
            <li>Defects must be reported within 48 hours of delivery along with photographic evidence.</li>
            <li>Approved defective items will be replaced in your next order or refunded to your original payment method.</li>
            <li>A 0% shrinkage and no color bleed guarantee applies to our core 220 GSM combed cotton collection when washed according to care instructions.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
