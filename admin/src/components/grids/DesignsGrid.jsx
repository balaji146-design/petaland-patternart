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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {designs.map((d) => (
        <div key={d.id} className="glass-card flex h-full min-w-0 flex-col p-4">
          <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-[#1a1410]">
            {d.image_url ? (
              <img src={d.image_url} alt={d.name} className="h-full w-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-luxury">No Image</div>
            )}
            {d.featured && (
              <span className="absolute top-2 left-2 bg-[#c9a24b]/20 text-[#e0bb63] px-2 py-0.5 text-xs rounded">Featured</span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="truncate text-sm font-medium text-[#f5ead9]">{d.name}</h3>
            <p className="mt-1 truncate text-xs text-muted-luxury">{d.category_name || d.category || 'Uncategorized'}</p>
            <div className="mt-auto flex items-end justify-between gap-3 pt-3">
              <div>
                <p className="text-sm text-[#f5ead9]">{formatCurrency(d.actual_price)}</p>
                <p className="text-xs text-[#e0bb63]">{formatCurrency(d.offer_price)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" onClick={() => onView?.(d)} aria-label={`View ${d.name}`} className="rounded-lg p-2 text-muted-luxury transition hover:bg-[#c9a24b]/10"><Eye className="h-4 w-4" /></button>
                <button type="button" onClick={() => onEdit?.(d)} aria-label={`Edit ${d.name}`} className="rounded-lg p-2 text-muted-luxury transition hover:bg-[#c9a24b]/10"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => onDelete?.(d)} aria-label={`Delete ${d.name}`} className="rounded-lg p-2 text-muted-luxury transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DesignsGrid
