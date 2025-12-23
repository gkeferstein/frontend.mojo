'use client'

export default function CertificateBanner() {
  return (
    <section className="py-8 md:py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Profile Pictures */}
          <div className="flex items-center -space-x-3 flex-shrink-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center text-primary-700 font-bold text-xs md:text-sm shadow-md"
              >
                {i === 14 ? (
                  <span className="text-white text-lg font-bold">+</span>
                ) : (
                  <span>{String.fromCharCode(65 + (i % 26))}</span>
                )}
              </div>
            ))}
          </div>

          {/* Text and Stars */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              Bereits <strong className="font-bold">500+ Fachleute</strong> weitergebildet
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-7 md:h-7 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Certificate Logo */}
          <div className="flex-shrink-0 bg-white border-2 border-gray-300 rounded-lg p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-black"></div>
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm font-semibold text-gray-800 mb-1">
                MENTOR FÜR CHRONISCHE GESUNDHEIT
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                ZERTIFIKAT
              </div>
              <div className="text-xs text-gray-600">
                INSTITUT FÜR<br />REGENERATIONSMEDIZIN
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


