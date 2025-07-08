export function mapRecord<T, U>(record: Record<string, T>, mapper: (value: T, key: string) => U): Record<string, U> {
    const result: Record<string, U> = {};
    for (const [key, value] of Object.entries(record)) {
        result[key] = mapper(value, key);
    }
    return result;
}