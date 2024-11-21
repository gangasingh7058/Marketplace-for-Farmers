function getTransportProviders(data) {
    const providers = [
        {
            provider: "Logistics Provider A",
            cost: data.weight * 200, // Calculating cost based on weight
            eta: "1 Day"
        },
        {
            provider: "Logistics Provider B",
            cost: data.weight * 250,
            eta: "2 Days"
        },
        {
            provider: "Logistics Provider C",
            cost: data.weight * 150,
            eta: "3 Days"
        }
    ];

    return providers;
}

export default getTransportProviders;
