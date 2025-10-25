import type { Config } from 'tailwindcss'


export default {
content: [
'./app/**/*.{ts,tsx}',
'./components/**/*.{ts,tsx}',
],
theme: {
extend: {
colors: {
base: {
DEFAULT: '#0a0a0a',
900: '#000000'
},
primary: {
DEFAULT: '#ef4444',
600: '#dc2626',
700: '#b91c1c'
}
},
boxShadow: {
glow: '0 0 0 2px rgba(239,68,68,0.35)'
},
backgroundImage: {
grid: 'radial-gradient(rgba(239,68,68,0.08) 1px, transparent 1px)'
}
},
},
plugins: [],
} satisfies Config

