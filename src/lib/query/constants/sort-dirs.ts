export const SortDirs = {
    Ascending: 'asc',
    Descending: 'desc',
} as const;

export const SortDirValues = [
    ...Object.values(SortDirs),
]