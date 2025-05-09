module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "3rem",
        xl: "3rem",
        "2xl": "4rem",
      },
    },
    extend: {
      boxShadow: {
        'custom': '0px 1px 13px 0px rgba(0, 0, 0, 0.05)',
      },
      borderColor: {
        'custom': '#000000',
      },
      colors: {
        base: {
          DEFAULT: '#DB4444',
          light: '#DB4444',
          dark: '#DB4444',
          secondary: '#000000',
        },
        title: {
          DEFAULT: '#E5E5FF',
          light: '#E5E5FF',
          dark: '#C3C3D9',
          secondary: '#C3C3D9',
        },
        button: {
          primary: {
            DEFAULT: '#DB4444',
            hover: '#DB4444',
            active: '#DB4444',
          },
          secondary: {
            DEFAULT: '#000000',
            hover: '#DB4444',
            active: '#DB4444',
          },
        },
        primary: {
          DEFAULT: '#DB4444',
          light: '#FAFAFA',
          secondary: '#000000',
        },
        secondary: {
          DEFAULT: '#F5F5F5',
          light: '#2F2F40',
          dark: '#000000',
        },
        success: {
          DEFAULT: '#00FF66',
          light: '#2F2F40',
          dark: '#000000',
        },
      },
    },
  },
  plugins: [],
};