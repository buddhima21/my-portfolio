import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0e0e16] border border-white/10 rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        data-lenis-prevent="true"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Gallery / Main Image */}
        <div className="w-full h-64 md:h-[400px] shrink-0 relative bg-black border-b border-white/10">
          {project.gallery && project.gallery.length > 0 ? (
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory h-full hide-scrollbar"
              data-lenis-prevent="true"
            >
              {project.gallery.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover sm:object-contain snap-center shrink-0"
                />
              ))}
            </div>
          ) : (
            <img 
              src={project.image} 
              alt={project.imageAlt}
              className="w-full h-full object-cover sm:object-contain"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-on-surface" style={{ color: project.accent }}>
                {project.emoji} {project.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 shrink-0">
              {project.sourceUrl && project.sourceUrl !== '#' && (
                <a 
                  href={project.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-semibold border border-white/10 text-on-surface"
                >
                  <span className="material-symbols-outlined text-lg">code</span>
                  Source
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  style={{ backgroundColor: project.accent, boxShadow: `0 0 20px ${project.accent}44` }}
                >
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

          {/* Details */}
          <div className="pb-4">
            {project.details ? (
              <div className="project-details-content">
                {project.details}
              </div>
            ) : (
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
