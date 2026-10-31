import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, colorClass }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl border-t-4 shadow-sm bg-white ${colorClass}`}
    >
        <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>
    </motion.div>
);

const MetricsSection = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
                title="Proyectos Totales"
                value={metrics.total}
                colorClass="border-blue-500"
            />
            <MetricCard
                title="Proyectos Encontrados"
                value={metrics.found}
                colorClass="border-purple-500"
            />
            <MetricCard
                title="Áreas Tecnológicas"
                value={metrics.areas}
                colorClass="border-green-500"
            />
            <MetricCard
                title="Sectores de Aplicación"
                value={metrics.sectors}
                colorClass="border-orange-500"
            />
        </div>
    );
};

export default MetricsSection;
