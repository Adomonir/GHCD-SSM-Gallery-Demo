'use client';

import { motion } from 'framer-motion';
import { Eye, Edit, Trash2 } from 'lucide-react';

export interface RecentGalleryItem {
  id: string | number;
  name: string;
  type: string;
  photos: number;
  views: number;
  status: string;
  lastUpdated: string;
}

export interface RecentGalleriesTableProps {
  galleries: RecentGalleryItem[];
  className?: string;
  showActions?: boolean;
  emptyMessage?: string;
  onView?: (gallery: RecentGalleryItem) => void;
  onEdit?: (gallery: RecentGalleryItem) => void;
  onDelete?: (gallery: RecentGalleryItem) => void;
}

const ROW_ANIMATION_DELAY = 0.04;

function getTypeBadgeClass(type: string): string {
  if (type === 'Client Review' || type === 'Portfolio') {
    return 'status-private';
  }

  if (type === 'Public') {
    return 'status-active';
  }

  return 'status-draft';
}

function getStatusBadgeClass(status: string): string {
  return status === 'Active' || status === 'Published' ? 'status-active' : 'status-draft';
}

/**
 * Reusable recent galleries table for dashboard and admin surfaces.
 *
 * @example
 * <SectionContainer>
 *   <SectionTitle title="Recent Galleries" viewAllLink="/admin/galleries" />
 *   <RecentGalleriesTable galleries={recentGalleries} />
 * </SectionContainer>
 */
export function RecentGalleriesTable({
  galleries,
  className = '',
  showActions = true,
  emptyMessage = 'No galleries available yet.',
  onView,
  onEdit,
  onDelete,
}: RecentGalleriesTableProps) {
  return (
    <div className={`card-base overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Gallery Name</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Type</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Photos</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Views</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Status</th>
              <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Last Updated</th>
              {showActions && (
                <th className="text-left py-3 px-6 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {galleries.length === 0 && (
              <tr className="table-row">
                <td
                  className="py-8 px-6 text-center text-slate-600 dark:text-slate-300"
                  colSpan={showActions ? 7 : 6}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {galleries.map((gallery, index) => (
              <motion.tr
                key={gallery.id}
                className="table-row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * ROW_ANIMATION_DELAY }}
              >
                <td className="py-4 px-6">
                  <div className="font-medium text-slate-900 dark:text-white">{gallery.name}</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`status-badge ${getTypeBadgeClass(gallery.type)}`}>{gallery.type}</span>
                </td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.photos}</td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.views.toLocaleString()}</td>
                <td className="py-4 px-6">
                  <span className={`status-badge ${getStatusBadgeClass(gallery.status)}`}>{gallery.status}</span>
                </td>
                <td className="py-4 px-6 text-slate-600 dark:text-slate-400">{gallery.lastUpdated}</td>
                {showActions && (
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-icon"
                        onClick={() => onView?.(gallery)}
                        aria-label={`View ${gallery.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="btn-icon btn-icon-success"
                        onClick={() => onEdit?.(gallery)}
                        aria-label={`Edit ${gallery.name}`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="btn-icon btn-icon-danger"
                        onClick={() => onDelete?.(gallery)}
                        aria-label={`Delete ${gallery.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}