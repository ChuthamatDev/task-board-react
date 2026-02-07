import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                h1: [
                    '3rem',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '-0.5px',
                        fontWeight: '600',
                    },
                ],
                h2: ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
                h3: ['1.875rem', { lineHeight: '1.2', fontWeight: '400' }],
                h4: ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }],
                h5: ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
                h6: ['1.125rem', { lineHeight: '1.2', fontWeight: '600' }],
                subtitle1: [
                    '1.125rem',
                    { lineHeight: '1.5', fontWeight: '400' },
                ],
                subtitle2: [
                    '0.875rem',
                    { lineHeight: '1.57', fontWeight: '500' },
                ],
            },
            boxShadow: {
                base: 'var(--shadow-base)',
            },
            colors: {
                app: {
                    bg: 'var(--color-bg)',
                    surface: 'var(--color-surface)',
                    card: 'var(--color-card)',
                    column: 'var(--color-column)',
                    border: 'var(--color-border)',

                    text: 'var(--color-text)',
                    subtle: 'var(--color-subtle-text)',

                    primary: 'var(--color-accent)',
                    'primary-hover': 'var(--color-accent-hover)',
                    'primary-fg': 'var(--color-accent-text)',

                    danger: 'var(--color-danger)',
                    'danger-hover': 'var(--color-danger-hover)',
                },
            },
        },
    },

    plugins: [scrollbar({ nocompatible: true })],
} satisfies Config
