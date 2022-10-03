export interface MSHits<T> {
    offset: number,
    limit: number,
    total: number,
    results: T[]
}

export interface MSSearchHits<T> {
    estimatedTotalHits: number; // Same as `total` in MSHits
    query: string;
    limit: number;
    offset: number;
    processingTimeMs: number;
    hits: T[]
}