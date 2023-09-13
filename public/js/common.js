const getMyAccount = async () => {
    const response = await fetch(
        `https://service.lisk.com/api/v2/accounts?username=commulab&isDelegate=true&limit=1&offset=0`,
        {mode: 'cors'}
    );
    const json = await response.json();
    return json.data[0];
}

const getRewardList = async () => {
    const response = await fetch(
        `https://mainnet-payout.liskcommulab.jp/`,
        {mode: 'cors'}
    );
    const json = await response.json();
    return json.voter;
}

const getBlock = async () => {
    const response = await fetch(
        `https://testnet-service.lisk.com/api/v2/blocks?limit=1&offset=0`,
        {mode: 'cors'}
    );
    const json = await response.json();
    return json.data[0];
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