import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Zen Maru Gothic"', 'sans-serif'],
      },
      colors: {
        'm-purple': '#E6E6FA',
        'm-blue': '#D6E4F0',
        'm-pink': '#F9E1E0',
        'm-green': '#D4E2D4',
        'm-cream': '#FDF5E6',
        'm-gray': '#9A9483',
      },
      borderRadius: {
        // 超圓潤棉花糖角
        'bubble': '40px',
      },
      boxShadow: {
        // 像雲朵一樣輕盈的陰影
        'soft': '0 10px 40px -10px rgba(187, 170, 135, 0.63)',
        // 內凹陰影，用於搜尋框或被按下的按鈕
        'inner-soft': 'inset 0 4px 8px 0 rgba(109, 103, 91, 0.05)',
      },
      animation: {
        // 讓雲朵或泡泡輕微漂浮
        'float': 'float 6s ease-in-out infinite',
        // 讓 Modal 跳出來更有彈性
        'pop': 'pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
    }
  }
}
