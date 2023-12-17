self.addEventListener('message', async(e) => {
    const data = await getEventInfo(e.data.url, e.data.address, e.data.height, e.data.offset, e.data.limit);
    self.postMessage(data);
}, false);

const getEventInfo = async(url, address, height, offset, limit) => {
    try {
        let eventInfo = [];
        const ret = await fetch(`https://${url}/api/v3/events?height=${height}&topic=${address}&offset=${offset}&limit=${limit}`);
        const json = await ret.json();
        const data = json.data;
        if (!data) return [];
        
        const eventInfo1 = [];
        for await(const d of data) {
            if (d.module === "token" && d.name === "mint" && d.topics.includes("03")) {
                eventInfo1.push({
                    id: d.id,
                    dataType: "Event",
                    type: "Receive",
                    command: `${d.module}:${d.name}`,
                    executionStatus: "successful",
                    senderAddress: "",
                    recipientAddress: d.data.address,
                    tokenID: d.data.tokenID,
                    amount: +d.data.amount / 100000000,
                    fee: 0,
                    timestamp: d.block.timestamp,
                    height: d.block.height,
                    remark: "Generate Block Reward",
                    order: 3
                });
            }
            else if (d.module === "token" && d.name === "lock" && d.data.module === "pos" && d.topics.includes("03")) {
                eventInfo1.push({
                    id: d.id,
                    dataType: "Event",
                    type: "Lock",
                    command: `${d.module}:${d.name}`,
                    executionStatus: "successful",
                    senderAddress: d.data.address,
                    recipientAddress: "",
                    tokenID: d.data.tokenID,
                    amount: +d.data.amount / 100000000 * -1,
                    fee: 0,
                    timestamp: d.block.timestamp,
                    height: d.block.height,
                    remark: "Sharing Reward",
                    order: 4
                });
            }
        }

        if (json.meta.count + json.meta.offset < json.meta.total) {
            const eventInfo2 = await getEventInfo(url, address, height, offset + limit, limit);
            eventInfo = eventInfo1.concat(eventInfo2);
        } else {
            eventInfo = eventInfo1;
        }
        return eventInfo;
    } catch(err) {
        return err;
    }
}