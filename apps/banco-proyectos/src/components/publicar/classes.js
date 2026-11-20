// Tailwind class strings shared by the journal finder components (design tokens: design/system.md).
// Quartile colors are the only values outside the institutional palette; they come from the old static page.
export const FOCUS = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-institutional-yellow focus-visible:outline-offset-2';
export const QUARTILE_CLASSES = { Q1: 'bg-[#1b7f3b]', Q2: 'bg-[#2f6fd0]', Q3: 'bg-[#c27c0e]', Q4: 'bg-[#8a5a9e]' };
export const FIT_CLASSES = { fuerte: 'bg-green-50 text-green-700', tecnologia: 'bg-blue-50 text-blue-700', sector: 'bg-gray-100 text-gray-700' };
export const RING_COLORS = { high: '#15803D', mid: '#1D4ED8', low: '#EA580C' }; // green-700, blue-700, orange-600
export const BAR_CLASSES = { high: 'bg-green-700', mid: 'bg-blue-700', low: 'bg-orange-600' };
export const NOTE = 'bg-white border-l-4 border-institutional-yellow rounded-r-xl px-4 py-3 text-[13.5px] text-gray-700 shadow-sm';
export const INPUT = `px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 ${FOCUS}`;
export const BTN = `no-underline text-center text-[13px] font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white whitespace-nowrap hover:bg-gray-50 disabled:opacity-55 disabled:cursor-not-allowed ${FOCUS}`;
export const BTN_PRIMARY = `no-underline text-center text-[13px] font-semibold px-3 py-2 rounded-lg border border-institutional-blue text-white bg-institutional-blue whitespace-nowrap hover:bg-blue-800 ${FOCUS}`;
export const BTN_SECONDARY = `text-sm font-semibold px-4 py-2.5 rounded-lg border border-institutional-blue text-institutional-blue bg-white hover:bg-blue-50 ${FOCUS}`;
export const DOWNLOAD = `inline-block no-underline text-center text-[13px] font-semibold px-3 py-2 rounded-lg bg-institutional-blue text-white hover:bg-blue-800 ${FOCUS}`;
export const LINK = `text-institutional-blue hover:underline rounded ${FOCUS}`;
