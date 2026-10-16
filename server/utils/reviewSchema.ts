import { z } from 'zod'
import { DRINK_CATEGORIES } from '#shared/constants/drink'

/** 選填文字欄位：空字串與 undefined 一律轉為 null 存入 DB */
const optionalText = (max: number) => z.string().trim().max(max).nullish()
  .transform(value => value || null)

/** 編輯評價的請求內容 */
export const updateReviewSchema = z.object({
  shop_name: z.string().trim().min(1, '請填寫店家名稱').max(50),
  drink_name: z.string().trim().min(1, '請填寫飲品名稱').max(50),
  category: z.enum(DRINK_CATEGORIES).nullish().transform(value => value ?? null),
  rating: z.number().int().min(1).max(5),
  sugar_ice: optionalText(30),
  comment: optionalText(500),
})

/** 新增評價的請求內容 */
export const createReviewSchema = updateReviewSchema.extend({
  shop_id: z.string().trim().max(64).nullish().transform(value => value || null),
})
