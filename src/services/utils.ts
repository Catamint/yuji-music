/**
 * Utils
 */
export function formatDuration(ms = 0) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatDate(timestamp: number | string | null) {
    timestamp = Number(timestamp);
    if (!timestamp || isNaN(timestamp)) return null;
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
}
