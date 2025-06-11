/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      padding: {
        '10%': '10%',
        // 你可以根据需要添加更多百分比值
      },
    },
  },
  plugins: [],
}

