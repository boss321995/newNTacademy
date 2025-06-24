import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // กำหนด path ของไฟล์
  const counterPath = join(process.cwd(), 'server', 'counter.json')
  const ipLogPath = join(process.cwd(), 'server', 'ip_log.json')

  // ดึง IP ผู้เข้าใช้งาน
  const ip = getRequestIP(event)
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  // อ่านไฟล์ counter.json และ ip_log.json
  let count = 0
  let ipLog: Record<string, string[]> = {}
  try {
    count = JSON.parse(await readFile(counterPath, 'utf8')).count || 0
  } catch { /* ไฟล์ยังไม่มี */ }
  try {
    ipLog = JSON.parse(await readFile(ipLogPath, 'utf8'))
  } catch { ipLog = {} }

  // ตรวจสอบว่า IP นี้เคยนับในวันนี้หรือยัง
  if (!ipLog[today]) ipLog[today] = []
  let isNew = false
  if (!ipLog[today].includes(ip)) {
    ipLog[today].push(ip)
    count += 1
    isNew = true
    // อัปเดต counter.json
    await writeFile(counterPath, JSON.stringify({ count }), 'utf8')
  }
  // อัปเดต ip_log.json
  await writeFile(ipLogPath, JSON.stringify(ipLog), 'utf8')

  return { count, isNew }
})

// ฟังก์ชันดึง IP จาก request
function getRequestIP(event: any): string {
  // Cloudflare, nginx, etc. อาจมี header อื่น
  const headers = event.node.req.headers
  return (
    headers['x-forwarded-for']?.split(',')[0] ||
    event.node.req.socket?.remoteAddress ||
    'unknown'
  )
}