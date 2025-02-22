
function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name
    
    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const cell = document.getElementById('profile.cell')
    cell.innerText = profileData.cell
    cell.href =`tel:${profileData.cell}`

    const adress = document.getElementById('profile.adress')
    adress.innerText = profileData.adress
    

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email
    email.href = `mailto:${profileData.email}`

}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills')

    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</ li>`).join('')
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills')

    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `
        <li class="${skill.class}">
            ${skill.name}
            <img src="${skill.logo}" alt="${skill.name} logo" class="skill-icon" />
        </li>`
    ).join('')
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages');
    

    profileData.languages.forEach((language, index) => {
        
        const [langName, level] = language.split(' (');
        const langCode = getLanguageCode(langName); 
        
        
        const li = document.createElement('li');
        li.className = `${langCode} title`;
        li.textContent = langName;

        
        const ul = document.createElement('ul');
        const levelItem = document.createElement('li');
        levelItem.innerHTML = `<p>${level ? level.replace(')', '') : ''}</p>`;
        ul.appendChild(levelItem);
        
        languages.appendChild(li);
        languages.appendChild(ul);

        if (index < profileData.languages.length - 1) {
            const hr = document.createElement('hr');
            languages.appendChild(hr);
        }
    });
}

function getLanguageCode(language) {
    const languageMap = {
        'Português BR': 'pt_br',
        'Inglês USA': 'us'
    };
    return languageMap[language] || '';
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profile.portfolio')
    portfolio.innerHTML = profileData.portfolio.map(project => {
        return `
            <li>
                <h3>${project.github ? 'class="github"' : ''}>${project.name}</h3>
                <a> href="${project.url}" target="_blank">${project.url}</a>
            </li>    
        `
    }).join('')
}


(async () => {
    const profileData = await fetchProfileData()
    updateProfileInfo(profileData)
    updateSoftSkills(profileData)
    updateHardSkills(profileData)
    updateLanguages(profileData)
    updatePortfolio(profileData)
})()