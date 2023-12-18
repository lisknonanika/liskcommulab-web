self.addEventListener('message', async(e) => {
    try {
        let data = [];
        if (e.data.type === "getExpRewards") {
            data = await getExpRewardsWorker(e.data.url, e.data.address);
        } else if (e.data.type === "getStakingReward") {
            data = await getStakingRewardInfoWorker(e.data.url, e.data.address, e.data.height, e.data.offset, e.data.limit);
        }
        self.postMessage(data);
    } catch(err) {
        self.postMessage([]);
    }
}, false);

const getExpRewardsWorker = async(url, address) => {
    try {
        const body = {
            "endpoint": "dynamicReward_getExpectedValidatorRewards",
            "params": {
                "validatorAddress": address
            }
        }
        const ret = await fetch(`https://${url}/api/v3/invoke`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return await ret.json();
    } catch(err) {
        return err;
    }
}

const getStakingRewardInfoWorker = async(url, address, height, offset, limit) => {
    try {
        let eventInfo = [];
        const ret = await fetch(`https://${url}/api/v3/events?height=${height}&senderAddress=${address}&offset=${offset}&limit=${limit}`);
        const json = await ret.json();
        const data = json.data;
        if (!data) return [];
        
        const eventInfo1 = [];
        for await(const d of data) {
            if (d.module === "pos" && d.name === "rewardsAssigned") {
                eventInfo1.push({
                    timestamp: d.block.timestamp,
                    amount: +d.data.amount
                });
            }
        }

        if (json.meta.count + json.meta.offset < json.meta.total) {
            const eventInfo2 = await getStakingRewardInfoWorker(url, address, height, offset + limit, limit);
            eventInfo = eventInfo1.concat(eventInfo2);
        } else {
            eventInfo = eventInfo1;
        }
        return eventInfo;
    } catch(err) {
        return err;
    }
}

const getBlockRewardInfoWorker = async(url, address, height, offset, limit) => {
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
            const eventInfo2 = await getBlockRewardInfoWorker(url, address, height, offset + limit, limit);
            eventInfo = eventInfo1.concat(eventInfo2);
        } else {
            eventInfo = eventInfo1;
        }
        return eventInfo;
    } catch(err) {
        return err;
    }
}