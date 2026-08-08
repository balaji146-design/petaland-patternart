import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, UploadCloud, Home } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout.jsx'
import DesignForm from '../../components/forms/DesignForm.jsx'

function UploadDesign() {
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-1.5 text-xs text-muted-luxury mb-3">
          <Link to="/dashboard" className="flex items-center gap-1 hover:text-[#e0bb63] transition">
            <Home className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#e0bb63]">Upload Design</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#c9a24b]/10 flex items-center justify-center flex-shrink-0">
            <UploadCloud className="w-5 h-5 text-[#c9a24b]" />
          </div>
          <div>
            <h1 className="heading-luxury text-2xl sm:text-3xl font-semibold">
              Upload New Design
            </h1>
            <p className="text-muted-luxury text-sm mt-1">
              Add a new henna design to your collection.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel p-5 sm:p-8"
      >
        <DesignForm />
      </motion.div>
    </AdminLayout>
  )
}

export default UploadDesign