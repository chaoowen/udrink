import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'm-blue': '#D6E4F0',   // 莫蘭迪淺藍
        'm-pink': '#F9E1E0',   // 莫蘭迪粉
        'm-green': '#D4E2D4',  // 莫蘭迪綠
        'm-cream': '#F7F2E0',  // 莫蘭迪奶茶
        'm-gray': '#9A9483',   // 莫蘭迪深灰 (文字用)
      },
      borderRadius: {
        'bubble': '40px',
      }
    }
  }
}
