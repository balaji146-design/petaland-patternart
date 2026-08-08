import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  Pencil,
  Trash2,
  ImageIcon,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Inbox,
} from 'lucide-react'
import Loader from '../common/Loader.jsx'
import { formatCurrency, formatDate } from '../../utils/helpers.js'

const PAGE_SIZE = 8

function SortHeader({ label, field, sortField, sortOrder, onSort }) {
  const isActive = sortField === field
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-luxury hover:text-[#e0bb63] transition"
    >
      {label}
      <span className="flex flex-col -space-y-1">
        <ChevronUp
          className={`w-3 h-3 ${
            isActive && sortOrder === 'asc' ? 'text-[#c9a24b]' : 'text-[#c9a24b]/25'
          }`}
        />
        <ChevronDown
          className={`w-3 h-3 ${
            isActive && sortOrder === 'desc' ? 'text-[#c9a24b]' : 'text-[#c9a24b]/25'
          }`}
        />
      </span>
    </button>
  )
}

function DesignsTable({ designs = [], loading = false, onView, onEdit, onDelete }) {
  const [sortField, setSortField] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1)
  }

  const sortedDesigns = useMemo(() => {
    const sorted = [...designs].sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]

      if (sortField === 'name') {
        valA = (a.name || '').toLowerCase()
        valB = (b.name || '').toLowerCase()
      }
      if (['actual_price', 'offer_price'].includes(sortField)) {
        valA = Number(valA) || 0
        valB = Number(valB) || 0
      }
      if (sortField === 'created_at') {
        valA = new Date(a.created_at || 0).getTime()
        valB = new Date(b.created_at || 0).getTime()
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [designs, sortField, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sortedDesigns.length / PAGE_SIZE))
  const paginatedDesigns = sortedDesigns.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  if (loading) {
    return (
      <div className="py-16">
        <Loader label="Loading designs..." />
      </div>
    )
  }

  if (designs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-[#c9a24b]/10 flex items-center justify-center mb-4">
          <Inbox className="w-6 h-6 text-[#c9a24b]/60" />
        </div>
        <p className="text-sm text-[#e8d9bd]">No designs found</p>
        <p className="text-xs text-muted-luxury mt-1">
          Try adjusting your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="border-b border-[#c9a24b]/15">
              <th className="text-left px-3 py-3 text-xs uppercase tracking-wide text-muted-luxury">
                Image
              </th>
              <th className="text-left px-3 py-3">
                <SortHeader
                  label="Design Name"
                  field="name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left px-3 py-3 text-xs uppercase tracking-wide text-muted-luxury">
                Category
              </th>
              <th className="text-left px-3 py-3">
                <SortHeader
                  label="Actual Price"
                  field="actual_price"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left px-3 py-3">
                <SortHeader
                  label="Offer Price"
                  field="offer_price"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="text-left px-3 py-3 text-xs uppercase tracking-wide text-muted-luxury">
                Featured
              </th>
              <th className="text-left px-3 py-3">
                <SortHeader
                  label="Created"
                  field="created_at"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="text-right px-3 py-3 text-xs uppercase tracking-wide text-muted-luxury">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedDesigns.map((design, idx) => (
              <motion.tr
                key={design.id || idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className="border-b border-[#c9a24b]/8 hover:bg-[#c9a24b]/5 transition"
              >
                <td className="px-3 py-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#5c3a21]/40 border border-[#c9a24b]/15 flex-shrink-0">
                    {design.image_url ? (
                      <img
                        src={design.image_url}
                        alt={design.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-[#c9a24b]/50" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <p className="text-sm text-[#f5ead9] max-w-[180px] truncate">
                    {design.name}
                  </p>
                </td>
                <td className="px-3 py-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#c9a24b]/10 text-[#e0bb63]">
                    {design.category_name || design.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-muted-luxury">
                  {formatCurrency(design.actual_price)}
                </td>
                <td className="px-3 py-3 text-sm text-[#e0bb63]">
                  {formatCurrency(design.offer_price)}
                </td>
                <td className="px-3 py-3">
                  {design.featured ? (
                    <Star className="w-4 h-4 text-[#c9a24b] fill-[#c9a24b]" />
                  ) : (
                    <span className="text-xs text-muted-luxury">—</span>
                  )}
                </td>
                <td className="px-3 py-3 text-xs text-muted-luxury whitespace-nowrap">
                  {formatDate(design.created_at)}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView?.(design)}
                      title="View"
                      className="p-2 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit?.(design)}
                      title="Edit"
                      className="p-2 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(design)}
                      title="Delete"
                      className="p-2 rounded-lg text-muted-luxury hover:bg-red-500/10 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-1">
          <p className="text-xs text-muted-luxury">
            Page {currentPage} of {totalPages} &middot; {designs.length} designs
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg glass-card hover:border-[#c9a24b]/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4 text-[#e0bb63]" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg glass-card hover:border-[#c9a24b]/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4 text-[#e0bb63]" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DesignsTable