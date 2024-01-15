//need to trigger this
//some sort function in the page I guess
console.log("Getting Client Sercet");
fetch("/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
    .then((res) => {
        if(res.ok) res.json()
    })
    .then(({url}) => {
        window.location = url; //maybe some sort of redirect
    })
    .catch(e => {
        console.error(e.error)
    });