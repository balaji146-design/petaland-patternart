import React from 'react'
import { Trash2, Eye, Pencil, Star } from 'lucide-react'
import Button from '../common/Button.jsx'
import { formatCurrency } from '../../utils/helpers.js'

function DesignsGrid({ designs = [], loading = false, onView, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="py-16">Loading designs...</div>
    )
  }

  if (!designs || designs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mb-4">
          <span className="text-[#c9a24b]/60">No</span>
        </div>
        <p className="text-sm text-[#e8d9bd]">No designs found</p>
        <p className="text-xs text-muted-luxury mt-1">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {designs.map((d) => (
        <div key={d.id} className="glass-card p-4 flex flex-col h-full">
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-[#1a1410] mb-3">
            {d.image_url ? (
              <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-luxury">No Image</div>
            )}
            {d.featured && (
              <span className="absolute top-2 left-2 bg-[#c9a24b]/20 text-[#e0bb63] px-2 py-0.5 text-xs rounded">Featured</span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-sm text-[#f5ead9] font-medium truncate">{d.name}</h3>
            <p className="text-xs text-muted-luxury mt-1 truncate">{d.category_name || d.category || 'Uncategorized'}</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f5ead9]">{formatCurrency(d.actual_price)}</p>
                <p className="text-xs text-[#e0bb63]">{formatCurrency(d.offer_price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onView?.(d)} className="p-2 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 transition"><Eye className="w-4 h-4" /></button>
                <button onClick={() => onEdit?.(d)} className="p-2 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 transition"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => onDelete?.(d)} className="p-2 rounded-lg text-muted-luxury hover:bg-red-500/10 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DesignsGrid
