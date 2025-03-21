/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,ts}'],
    theme: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
    },
    plugins: [typography, forms],
};
