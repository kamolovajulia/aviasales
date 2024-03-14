export const sortByPrice = (tickets) => 
    tickets.sort(function (a, b) {
        return a.price - b.price;
    })

export const sortByTime = (tickets) => {
    if (tickets.length <= 1) {
        return tickets;
    }
    
    const pivotId = tickets[Math.floor(tickets.length / 2)];
    const pivot = pivotId.segments[0].duration+pivotId.segments[1].duration;
    const less = tickets.filter(value => value.segments[0].duration+value.segments[1].duration < pivot);
    const equal = tickets.filter(value => value.segments[0].duration+value.segments[1].duration === pivot);
    const greater = tickets.filter(value => value.segments[0].duration+value.segments[1].duration > pivot);
    return [...sortByTime(less), ...equal, ...sortByTime(greater)];

}