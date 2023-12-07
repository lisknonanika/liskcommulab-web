const SERVICE_URL = "mainnet-service.lisk.com";
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
    const ret = await fetch(`https://${SERVICE_URL}/api/v3/pos/validators?sort=rank:asc&limit=101`);
    const json = await ret.json();
    return json.data;
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