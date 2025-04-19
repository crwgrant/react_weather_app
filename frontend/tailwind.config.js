/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        // Weather icon animations
        'scale-in-center': 'scaleInCenter 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-top': 'slideInTop 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-bottom': 'slideInBottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'bounce-in-bottom': 'bounceInBottom 1.1s both',
        'vibrate-1': 'vibrate1 0.3s linear infinite both',
        'swing-in-top-fwd': 'swingInTopFwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both',
        'blur-in': 'blurIn 0.4s linear both',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        // Weather icon keyframes
        scaleInCenter: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(1000px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-1000px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-1000px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(1000px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceInBottom: {
          '0%': { transform: 'translateY(500px)', animationTimingFunction: 'ease-in', opacity: '0' },
          '38%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out', opacity: '1' },
          '55%': { transform: 'translateY(65px)', animationTimingFunction: 'ease-in' },
          '72%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out' },
          '81%': { transform: 'translateY(28px)', animationTimingFunction: 'ease-in' },
          '90%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out' },
          '95%': { transform: 'translateY(8px)', animationTimingFunction: 'ease-in' },
          '100%': { transform: 'translateY(0)', animationTimingFunction: 'ease-out' },
        },
        vibrate1: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        swingInTopFwd: {
          '0%': { transform: 'rotateX(-100deg)', transformOrigin: 'top', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', transformOrigin: 'top', opacity: '1' },
        },
        blurIn: {
          '0%': { filter: 'blur(12px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}