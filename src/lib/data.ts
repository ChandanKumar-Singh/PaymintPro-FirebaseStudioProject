'use server';

// Simulate a database query with a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getDashboardStats() {
    await delay(1500); // Simulate network latency

    const data = {
        totalRevenue: {
            value: 45231.89,
            change: 20.1,
        },
        subscriptions: {
            value: 2350,
            change: 180.1,
        },
        sales: {
            value: 12234,
            change: 19,
        },
        activeNow: {
            value: 573,
            change: 201,
        }
    };

    return data;
}
