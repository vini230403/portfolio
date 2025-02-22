

async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/vini230403/portfolio/refs/heads/main/data/profile.json'
    const fetching = await fetch(url)
    return await fetching.json()
}