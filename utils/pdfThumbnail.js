export async function renderPdfThumbnail(pdfUrl, width = 200) {
  if (typeof window === 'undefined') return null
  const { GlobalWorkerOptions, getDocument } = await import('pdfjs-dist/build/pdf')
  // ใช้ baseURL เสมอ
  const base = window.__NUXT__?.config?.app?.baseURL || '/'
  GlobalWorkerOptions.workerSrc = base.replace(/\/$/, '') + '/pdf.worker.js'
  console.log('[PDF Thumbnail] workerSrc:', GlobalWorkerOptions.workerSrc)
  console.log('[PDF Thumbnail] pdfUrl:', pdfUrl)

  pdfUrl = encodeURI(pdfUrl)
  try {
    const loadingTask = getDocument(pdfUrl)
    const pdf = await loadingTask.promise
    if (!pdf) {
      console.warn('[PDF Thumbnail] PDF not loaded:', pdfUrl)
      return null
    }
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 1 })
    const scale = width / viewport.width
    const scaledViewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = scaledViewport.width
    canvas.height = scaledViewport.height
    context.save()
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
    await page.render({ canvasContext: context, viewport: scaledViewport }).promise
    return canvas.toDataURL('image/png')
  } catch (e) {
    console.error('[PDF Thumbnail] Error:', e)
    return null
  }
}