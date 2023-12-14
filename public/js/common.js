const SERVICE_URL = "service.lisk.com";
const VALIDATOR_ADDRESS = "lsk5tyhc6tw76ybwwzt9vcefy3gryjvprkcj329tw";
const DAILY_GENERATE_BLOCK = 24 * 60 * 60 / 10 / 103;

const getCurrentHeight = async() => {
    const ret = await fetch(`https://${SERVICE_URL}/api/v3/blocks?limit=1`);
    const json = await ret.json();
    return json.data[0].height;
}

const getMyAccount = async () => {
    const response = await fetch(`https://${SERVICE_URL}/api/v3/pos/validators?address=${VALIDATOR_ADDRESS}&limit=1`);
    const json = await response.json();
    return json.data[0];
}

const getMyReward = async() => {
    const ret = await fetch(`https://${SERVICE_URL}/api/v3/blocks?generatorAddress=${VALIDATOR_ADDRESS}&limit=1`);
    const json = await ret.json();
    const data = json.data[0];
    blockReward = +data.reward / 100000000;
}

const getValidators = async() => {
    const ret = await fetch(`https://${SERVICE_URL}/api/v3/pos/validators?status=active&sort=rank:asc&limit=101`);
    const json = await ret.json();
    return json.data;
}

const getRewardsAssigned = async(address, from, to, offset, limit) => {
    try {
        let rewardsAssignedInfo = [];
        const rewardsAssignedInfo1 = [];
        const ret = await fetch(`https://${SERVICE_URL}/api/v3/events?senderAddress=${address}&timestamp=${from}:${to}&offset=${offset}&limit=${limit}&sort=timestamp:asc`);
        const json = await ret.json();
        if (!json.data) return [];
        const data = json.data.filter((d) => d.module === "pos" & d.name === "rewardsAssigned");
        if (data !== undefined) {
            for await(const d of data) {
                rewardsAssignedInfo1.push({
                    validatorAddress: d.data.validatorAddress,
                    tokenID: d.data.tokenID,
                    amount: d.data.amount,
                    timestamp: d.block.timestamp
                });
            }
        }
        if (json.data && json.meta.count + json.meta.offset < json.meta.total) {
            const rewardsAssignedInfo2 = await getRewardsAssigned(address, from, to, offset + limit, limit);
            rewardsAssignedInfo = rewardsAssignedInfo1.concat(rewardsAssignedInfo2);
        } else {
            rewardsAssignedInfo = rewardsAssignedInfo1;
        }
        return rewardsAssignedInfo;
    } catch(err) {
        return err;
    }
}

const getBFTParameters = async(height) => {
    const body = {
        "endpoint": "consensus_getBFTParameters",
        "params": {
            "height": height
        }
    }
    const ret = await fetch(`https://${SERVICE_URL}/api/v3/invoke`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const json = await ret.json();
    return json.data;
}

const getYMD = (days) => {
    const d = new Date();
    if (days !== undefined) d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${("00" + (d.getMonth() + 1)).slice(-2)}-${("00" + d.getDate()).slice(-2)}`;
}

const toggleContent = (node) => {
    const content = node.querySelector(".content");
    const icon = node.querySelector(".open-close i");
    
    if (content.classList.contains("open")) {
        content.classList.remove("open");
        icon.classList.remove("fa-square-minus");
        icon.classList.add("fa-square-plus");
        return;
    }
    content.classList.add("open");
    icon.classList.remove("fa-square-plus");
    icon.classList.add("fa-square-minus");
}

for (let element of document.querySelectorAll(".content-title")) {
    element.addEventListener("click", () => toggleContent(element.parentNode));
}

for (let element of document.querySelectorAll(".content-description")) {
    element.addEventListener("click", () => toggleContent(element.parentNode));
}